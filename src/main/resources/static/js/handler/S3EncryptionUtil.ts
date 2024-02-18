
export type Algorithm = {
	name : string,
	modulusLength : number,
	publicExponent : Uint8Array,
	hash : string
}

export const s3EncryptionUtil = new class S3EncryptionUtil{

	encoder = new TextEncoder();
	decoder = new TextDecoder();

	signAlgorithm = {
		name: "RSASSA-PKCS1-v1_5",
		// Consider using a 4096-bit key for systems that require long-term security
		modulusLength: 2048,
		publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
		hash: "SHA-256",
	} as Algorithm

	secretAlgorithm = {
		name: "RSA-OAEP",
		modulusLength: 2048,
		publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
		hash: "SHA-256",
	} as Algorithm

	async generateKeyPair(algorithm : Algorithm, keyUsages: ReadonlyArray<KeyUsage>){
		return window.crypto.subtle.generateKey(
			algorithm,
			true,
			keyUsages//["sign", "verify"]
		);
	}

	async keySign(data : string, privateKey: CryptoKey){
		let message = this.encoder.encode(data);
		return window.crypto.subtle.sign(this.signAlgorithm.name, privateKey, message).then(signature=>{
			return {message, signature};
		})
	}

	async decryptMessage(privateKey: CryptoKey, ciphertext : Uint8Array, algorithm: Algorithm) {
		return window.crypto.subtle.decrypt(
			{ name: algorithm.name },
			privateKey,
			ciphertext,
		).catch(err=>{
			console.error(err.message);
			console.error(err.stack);
		});
	}

	
	async convertBase64ToBuffer(base64 : string){
		return fetch(`data:application/octet-binary;base64,${base64}`)
		.then(res=>res.arrayBuffer())
		.then(buffer=>new Uint8Array(buffer))
	}

	async exportKey(exportType : KeyFormat, key : CryptoKey){
		return window.crypto.subtle.exportKey(exportType, key).then(exportKey => {
			return new Promise( resolve => resolve(String.fromCharCode(...new Uint8Array( (exportKey as ArrayBuffer) ))) ) as Promise<string>;
		}).then(exportKeyString => {
			return new Promise( resolve => resolve(window.btoa(exportKeyString)) );
		});
	}
	async callS3PresignedUrl(callFunction : Function, signData : string, callFunctionParam = {} ){//,fileName, accountName){
		console.log('callFunctionParam !!! ',callFunctionParam);
		return Promise.all( [this.generateKeyPair(this.signAlgorithm, ["sign", "verify"]), this.generateKeyPair(this.secretAlgorithm, ["encrypt", "decrypt"])] )
		.then( ([signKeyPair, encDncKeyPair]) => {
			return Promise.all( [
				this.exportKey('spki', signKeyPair.publicKey),
				this.exportKey('spki', encDncKeyPair.publicKey), 
				Promise.resolve(encDncKeyPair), 
				Promise.resolve(signKeyPair)
			] )		
		}).then( async ([exportSignKey, exportEncKey, encDncKeyPair, signKeyPair]) => {

			let sign = await this.keySign(
				`${signData}:${exportEncKey}`, 
				signKeyPair.privateKey
			)
			
			let result = await callFunction(Object.assign(callFunctionParam, {
				data: window.btoa(String.fromCodePoint(...sign.message)), 
				dataKey: exportSignKey, 
				sign: window.btoa( String.fromCodePoint(...new Uint8Array(sign.signature)) ), 
			}))

			let {code, data} = result;
			
			if(code != 0){
				return ;
			}
			
			return {data, encDncKeyPair};
		})
	}

	async fetchPutObject(putUrl : string, key : string , md5: string, fileData : File){
		return fetch(putUrl, {
			method:"PUT",
			headers: {
				'Content-Encoding' : 'base64',
				'Content-Type' : 'application/octet-stream',
				'x-amz-server-side-encryption-customer-algorithm': 'AES256',
				'x-amz-server-side-encryption-customer-key': key,
				'x-amz-server-side-encryption-customer-key-md5': md5,
			},
			body: fileData
		})
	}
}