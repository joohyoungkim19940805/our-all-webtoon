package com.our.all.webtoon.util;

import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.SignatureException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.MGF1ParameterSpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.function.Consumer;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;

import com.google.common.io.BaseEncoding;

import lombok.Getter;


/**
 * @author kimjoohyoung
 * rsa 암호화 유틸
 * 이 클래스는 원래 java - javascript간 암복호화 및 서명을 위한 로직이었습니다. 
 * OAEP 객체는 java - javascript 간 호환성을 위한 매개변수로 생성되었습니다.
 * 사용법은 해당 클래스의 main method에 있습니다.
 */
public class RSA {
    // private static final String HEADER = "-----BEGIN %s KEY-----\n";
    // private static final String FOOTER = "\n-----END %s KEY-----\n";
    //
    // private static final String PUBLIC = "PUBLIC";
    // private static final String PRIVATE = "PRIVATE";

    public static final Base64.Encoder encoder = Base64.getEncoder();
    public static final Base64.Decoder decoder = Base64.getDecoder();

    public static final OAEPParameterSpec oaepParams = new OAEPParameterSpec("SHA-256", "MGF1", new MGF1ParameterSpec("SHA-256"), PSource.PSpecified.DEFAULT);

    @Getter
    private PublicKey publicKey;
    @Getter
    private PrivateKey privateKey;
    @Getter
    private KeyPair keyPair;

    public static KeyPair createKey() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048, new SecureRandom());
        return generator.generateKeyPair();
    }

    public static void createEncryptCipher(PublicKey publicKey, Consumer<Cipher> resultHandler) {
        Cipher encryptCipher;
        try {
            encryptCipher = Cipher.getInstance("RSA/ECB/OAEPPadding");
            encryptCipher.init(
                Cipher.ENCRYPT_MODE,
                publicKey, RSA.oaepParams
            );
            resultHandler.accept(encryptCipher);
            // return encryptCipher;
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidAlgorithmParameterException e) {
            resultHandler.accept(null);
            // return null;
            //return Mono.error(new S3ApiException(Result._504));
        } catch(InvalidKeyException e) {
            resultHandler.accept(null);
            // return null;
            //return Mono.error(new S3ApiException(Result._505));
        }
    }

    public static void createDecryptCipher(PrivateKey privateKey, Consumer<Cipher> resultHandler) {
        Cipher decryptCipher;
        try {
            decryptCipher = Cipher.getInstance("RSA/ECB/OAEPPadding");
            decryptCipher.init(
                Cipher.DECRYPT_MODE,
                privateKey, RSA.oaepParams
            );
            resultHandler.accept(decryptCipher);
            // return encryptCipher;
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidAlgorithmParameterException e) {
            resultHandler.accept(null);
            // return null;
            //return Mono.error(new S3ApiException(Result._504));
        } catch(InvalidKeyException e) {
            resultHandler.accept(null);
            // return null;
            //return Mono.error(new S3ApiException(Result._505));
        }
    }

    public static String encryptMessage(Cipher encryptCipher, String message) throws IllegalBlockSizeException, BadPaddingException {
        byte b[] = encryptCipher.doFinal(message.getBytes(StandardCharsets.UTF_8));
        return BaseEncoding.base64()
            .encode(b);
    }

    public static String decryptMessage(Cipher decryptCipher, String base64) throws IllegalBlockSizeException, BadPaddingException {
        byte b[] = decryptCipher.doFinal(BaseEncoding.base64()
            .decode(base64));
        return new String(b, StandardCharsets.UTF_8);
    }

    public static boolean verify(PublicKey publicKey, String data, String sign) {
        try {
            Signature signature = Signature.getInstance("SHA256withRSA");
            signature.initVerify(publicKey);
            signature.update(data.getBytes(StandardCharsets.UTF_8));
            return signature.verify(BaseEncoding.base64()
                .decode(sign));
        } catch (SignatureException | NoSuchAlgorithmException | InvalidKeyException e) {
            return false;
        }
    }

    public static String sign(PrivateKey privateKey, String data) {
        try {
            Signature signature = Signature.getInstance("SHA256withRSA");
            signature.initSign(privateKey);
            signature.update(data.getBytes(StandardCharsets.UTF_8));
            return BaseEncoding.base64()
                .encode(signature.sign());
            // return signature.verify(BaseEncoding.base64()
            // .decode(sign));
        } catch (SignatureException | NoSuchAlgorithmException | InvalidKeyException e) {
            return null;
        }
    }

    public static PrivateKey loadPrivateKey(String encodingPrivate) {
        PrivateKey privateKey = null;
        try {
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(RSA.decoder.decode(encodingPrivate.getBytes(StandardCharsets.UTF_8)));
            
            privateKey = KeyFactory.getInstance("RSA").generatePrivate(keySpec);
            
        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return privateKey;
    }
    public static PublicKey loadPublicKey(String encodingPublic) {
        PublicKey publicKey = null;
        try {

            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(RSA.decoder.decode(encodingPublic.getBytes(StandardCharsets.UTF_8)));
            
            publicKey = KeyFactory.getInstance("RSA").generatePublic(keySpec);
            
        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return publicKey;
    }

    public static void main(String a[]) throws NoSuchAlgorithmException, InvalidKeyException, SignatureException {

        var pair = RSA.createKey();
        var privateK = pair.getPrivate();
        var publicK = pair.getPublic();

        String test = "test";
        String test2 = "aaa";

        // sing
        String sign = RSA.sign(privateK, test);
        boolean isTrue = RSA.verify(publicK, test, sign);
        boolean isFalse = RSA.verify(publicK, test2, sign);
        System.out.println("sign result ::: " + isTrue);
        System.out.println("sign result ::: " + isFalse);

        // encrypt
        var messageWrapper = new Object() {
            public String encMessage = null;
            public String decMessage = null;
        };
        RSA.createEncryptCipher(publicK, (cipher) -> {
            if (cipher == null)
                return;
            try {
                messageWrapper.encMessage = RSA.encryptMessage(cipher, test);
            } catch (IllegalBlockSizeException | BadPaddingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        });
        RSA.createDecryptCipher(privateK, (cipher) -> {
            if (cipher == null)
                return;
            try {
                messageWrapper.decMessage = RSA.decryptMessage(cipher, messageWrapper.encMessage);
            } catch (IllegalBlockSizeException | BadPaddingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        });

        System.out.println("enc message ::: " + messageWrapper.encMessage);
        System.out.println("dec message ::: " + messageWrapper.decMessage);

        var keyPair = RSA.createKey();
        String pr = RSA.encoder.encodeToString(keyPair.getPrivate()
            .getEncoded());
        String pu = RSA.encoder.encodeToString(keyPair.getPublic()
            .getEncoded());

        System.out.println(pr);
        System.out.println(pu);

        System.out.println(RSA.loadPrivateKey(pr));
        System.out.println(RSA.loadPublicKey(pu));
        

        System.out.println(RSA.encoder.encodeToString( RSA.loadPrivateKey(pr).getEncoded() ));
        System.out.println(RSA.encoder.encodeToString( RSA.loadPublicKey(pu).getEncoded() ));

    }
}
