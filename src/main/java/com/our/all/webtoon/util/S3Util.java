package com.our.all.webtoon.util;

import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.SignatureException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.crypto.keygen.KeyGenerators;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.io.BaseEncoding;
import com.our.all.webtoon.config.security.Role;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.util.exception.S3ApiException;
import com.our.all.webtoon.util.S3Util.SSE_CustomerKeyRequest.UploadType;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;

public class S3Util {
	
	private static SecureRandom random = new SecureRandom();
	
	public static IvParameterSpec generateIv() {
	    byte[] iv = new byte[16];
	    random.nextBytes(iv);
	    return new IvParameterSpec(iv);
	}
	
	public static SecretKey generateKey(String password, String salt)throws NoSuchAlgorithmException, InvalidKeySpecException {
	    SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
	    KeySpec spec = new PBEKeySpec(password.toCharArray(), salt.getBytes(), 1000, 256);
	    SecretKey secret = new SecretKeySpec(factory.generateSecret(spec)
	        .getEncoded(), "AES");
	    
	    return secret;
	}
	public static SecretKey generateKey() throws NoSuchAlgorithmException {
	    KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
	    keyGenerator.init(256);
	    SecretKey key = keyGenerator.generateKey();
	    return key;
	}
	/**
	 * get md5 digest hash. MessageDigest를 static하게 사용하지 말 것
	 * @see https://www.baeldung.com/java-md5
	 * @param b
	 * @return byte[]
	 * @throws NoSuchAlgorithmException
	 * @author joohyoungkim
	 */
	public static byte[] getMd5Digest(byte[] b) throws NoSuchAlgorithmException {
		MessageDigest md = MessageDigest.getInstance("MD5");
		md.update(b);
		byte hash[] = md.digest();
		return hash;
	}
	
	@Getter
	@Setter
	@Builder(toBuilder = true)
	@NoArgsConstructor
	@AllArgsConstructor
	@With
	@ToString
	public static class SSE_CustomerKeyRequest{
		private String data;
		private String sign;
		private String dataKey;
		private String encryptionKey;
		private String roomId;
		private String workspaceId;
		private String accountName;
		private String fileName;
		private String newFileName;
		private String contentType;
		private String customerProvidedKey;
		private UploadType uploadType;
		private FileType fileType;
		public enum UploadType{
			CHATTING, NOTICE, PROFILE
		}
		public enum FileType{
			IMAGE, VIDEO, FILE
		}

		public boolean initVerify(PublicKey publicKey) throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {
			Signature signature = Signature.getInstance("SHA256withRSA");
			byte[] dataByte = BaseEncoding.base64().decode(data);
			signature.initVerify(publicKey);
			signature.update(dataByte);
			
			boolean isVerify = signature.verify( BaseEncoding.base64().decode(sign) );
			if(isVerify) {
				String dataString = new String(dataByte, StandardCharsets.UTF_8);
				String[] dataList = dataString.split(":");
				if(dataList.length != 5) {
					throw new S3ApiException(Result._503);
				}
				this.roomId = dataList[0].trim();
				this.workspaceId = dataList[1].trim();
				this.fileName = dataList[2].trim();
				this.accountName = dataList[3].trim();
				this.encryptionKey = dataList[4].trim();
			}
			return isVerify;
		}
	}
	
	@Getter
	@Setter
	@Builder(toBuilder = true)
	@NoArgsConstructor
	@AllArgsConstructor
	@With
	public static class SSE_CustomerKeyResponse{
		private String encryptionKey;
		private String encryptionMd;
		private URL presignedUrl;
		private String newFileName;
	}
	
	@Setter
	@Getter
	public static class PresigneUrlRequest{
		private UploadType uploadType;
		private String fileName;
	}
}
