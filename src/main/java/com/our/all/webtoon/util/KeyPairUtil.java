package com.our.all.webtoon.util;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
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
import java.util.concurrent.ExecutionException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.SecretKey;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.core.io.buffer.DefaultDataBufferFactory;
import com.google.common.io.BaseEncoding;
import com.our.all.webtoon.util.properties.S3Properties;
import lombok.Getter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import software.amazon.awssdk.core.async.AsyncResponseTransformer;
import software.amazon.awssdk.services.s3.S3AsyncClientBuilder;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.ServerSideEncryption;

/**
 * 추후 s3기반으로 변경 예정
 */
public class KeyPairUtil {
    private static final String HEADER = "-----BEGIN %s KEY-----\n";
    private static final String FOOTER = "\n-----END %s KEY-----\n";

    private static final String PUBLIC = "PUBLIC";
    private static final String PRIVATE = "PRIVATE";

    private static final Base64.Encoder encoder = Base64.getEncoder();
    private static final Base64.Decoder decoder = Base64.getDecoder();

    @Getter
    private PublicKey publicKey;
    @Getter
    private PrivateKey privateKey;

    @Getter
    private KeyPair keyPair;

    private final KeyPairUtilBuilder builder;

    private final SecretKey key;
    private final byte[] mdDigestHash;
    private final Path dirPath;
    private final Path publicPath;
    private final Path privatePath;

    protected KeyPairUtil(KeyPairUtilBuilder builder)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        this.builder = builder;
        key = S3Util.generateKey(builder.s3Properties.getSseCProperties().getCustomProvidedKey(),
                builder.s3Properties.getSseCProperties().getSlat());
        mdDigestHash = S3Util.getMd5Digest(key.getEncoded());
        dirPath = Paths.get(builder.keyPairFileDir);
        publicPath = Paths.get(builder.keyPairFileDir + "\\\\" + builder.keyPublicName);
        privatePath = Paths.get(builder.keyPairFileDir + "\\\\" + builder.keyPrivateName);
    }

    public static class KeyPairUtilBuilder {
        private String keyPairFileDir;
        private String keyPublicName;
        private String keyPrivateName;
        private S3Properties s3Properties;
        private S3AsyncClientBuilder s3AsyncClientBuilder;

        public KeyPairUtilBuilder keyPairFileDir(String keyPairFileDir) {
            this.keyPairFileDir = keyPairFileDir;
            return this;
        }

        public KeyPairUtilBuilder keyPublicName(String keyPublicName) {
            this.keyPublicName = keyPublicName;
            return this;
        }

        public KeyPairUtilBuilder keyPrivateName(String keyPrivateName) {
            this.keyPrivateName = keyPrivateName;
            return this;
        }

        public KeyPairUtilBuilder s3Properties(S3Properties s3Properties) {
            this.s3Properties = s3Properties;
            return this;
        }

        public KeyPairUtilBuilder s3AsyncClientBuilder(S3AsyncClientBuilder s3AsyncClientBuilder) {
            this.s3AsyncClientBuilder = s3AsyncClientBuilder;
            return this;
        }

        public KeyPairUtil build() throws NoSuchAlgorithmException, InvalidKeySpecException {
            return new KeyPairUtil(this);
        }
    }

    public static final OAEPParameterSpec oaepParams = new OAEPParameterSpec("SHA-256", "MGF1",
            new MGF1ParameterSpec("SHA-256"), PSource.PSpecified.DEFAULT);


    public void saveAndSetVariableKeyPair() throws Exception {
        this.getS3KeyPair();
        if (Files.notExists(publicPath, LinkOption.NOFOLLOW_LINKS)
                || Files.notExists(privatePath, LinkOption.NOFOLLOW_LINKS)) {
            this.createLocalKeyPair(dirPath, publicPath, privatePath);
            this.putS3KeyPair(dirPath, publicPath, privatePath);
        } else {
            this.publicKey = KeyPairUtil.loadPublicKey(publicPath);
            this.privateKey = KeyPairUtil.loadPrivateKey(privatePath);
            this.keyPair = new KeyPair(this.publicKey, this.privateKey);
        }

    }

    public void createLocalKeyPair(Path dirPath, Path publicPath, Path privatePath)
            throws NoSuchAlgorithmException {

        this.keyPair = KeyPairUtil.createKey();

        this.publicKey = keyPair.getPublic();
        this.privateKey = keyPair.getPrivate();

        try (BufferedWriter publicWriter = Files.newBufferedWriter(publicPath,
                StandardCharsets.UTF_8, StandardOpenOption.CREATE);
                BufferedWriter privateWriter = Files.newBufferedWriter(privatePath,
                        StandardCharsets.UTF_8, StandardOpenOption.CREATE)) {
            Files.createDirectories(dirPath);
            publicWriter.write(KeyPairUtil.HEADER.formatted(KeyPairUtil.PUBLIC)
                    + encoder.encodeToString(this.publicKey.getEncoded())
                    + KeyPairUtil.FOOTER.formatted(KeyPairUtil.PUBLIC));
            publicWriter.flush();

            privateWriter.write(KeyPairUtil.HEADER.formatted(KeyPairUtil.PRIVATE)
                    + encoder.encodeToString(this.privateKey.getEncoded())
                    + KeyPairUtil.FOOTER.formatted(KeyPairUtil.PRIVATE));
            privateWriter.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (NullPointerException e) {
            e.printStackTrace();
        } /*
           * catch(AccessDeniedException e) { e.printStackTrace(); }
           */

    }

    public void putS3KeyPair(Path dirPath, Path publicPath, Path privatePath) throws Exception {

        String base64Key = BaseEncoding.base64().encode(key.getEncoded());
        String base64Md = BaseEncoding.base64().encode(mdDigestHash);

        PutObjectRequest publicKeyPutObjectReuqest =
                PutObjectRequest.builder().bucket(builder.s3Properties.getBucket())
                        .key("secret/%s".formatted(builder.keyPublicName))
                        .sseCustomerAlgorithm(ServerSideEncryption.AES256.toString())
                        .sseCustomerKey(base64Key).sseCustomerKeyMD5(base64Md).build();
        PutObjectRequest privateKeyPutObjectReuqest =
                PutObjectRequest.builder().bucket(builder.s3Properties.getBucket())
                        .key("secret/%s".formatted(builder.keyPrivateName))
                        .sseCustomerAlgorithm(ServerSideEncryption.AES256.toString())
                        .sseCustomerKey(base64Key).sseCustomerKeyMD5(base64Md).build();

        var s3Client = builder.s3AsyncClientBuilder.build();

        var publicKeyFuture = s3Client.putObject(publicKeyPutObjectReuqest, publicPath);
        var privateKeyFuture = s3Client.putObject(privateKeyPutObjectReuqest, privatePath);
        if (!publicKeyFuture.isDone() || !publicKeyFuture.isDone()) {
            if (publicKeyFuture.isCompletedExceptionally() || publicKeyFuture.isCancelled())
                s3Client.close();
            return;
        }
        publicKeyFuture.get();
        privateKeyFuture.get();
        if (publicKeyFuture.isCompletedExceptionally() || publicKeyFuture.isCancelled())
            s3Client.close();
    }

    public void getS3KeyPair() throws InterruptedException, ExecutionException {
        String base64Key = BaseEncoding.base64().encode(key.getEncoded());
        String base64Md = BaseEncoding.base64().encode(mdDigestHash);
        var s3Client = builder.s3AsyncClientBuilder.build();

        GetObjectRequest getPublicKeyObjectReuqest =
                GetObjectRequest.builder().bucket(builder.s3Properties.getBucket())
                        .key("secret/%s".formatted(builder.keyPublicName))
                        .sseCustomerAlgorithm(ServerSideEncryption.AES256.toString())
                        .sseCustomerKey(base64Key).sseCustomerKeyMD5(base64Md).build();
        GetObjectRequest getPrivateKeyObjectReuqest =
                GetObjectRequest.builder().bucket(builder.s3Properties.getBucket())
                        .key("secret/%s".formatted(builder.keyPublicName))
                        .sseCustomerAlgorithm(ServerSideEncryption.AES256.toString())
                        .sseCustomerKey(base64Key).sseCustomerKeyMD5(base64Md).build();
        var publicKeyFuture = s3Client.getObject(getPublicKeyObjectReuqest,
                AsyncResponseTransformer.toPublisher());
        var privateKeyFuture = s3Client.getObject(getPrivateKeyObjectReuqest,
                AsyncResponseTransformer.toPublisher());

        if (!publicKeyFuture.isDone() || !privateKeyFuture.isDone()) {
            if (publicKeyFuture.isCompletedExceptionally() || publicKeyFuture.isCancelled())
                s3Client.close();
            return;
        }

        DataBufferUtils.write(//
                Mono.fromFuture(publicKeyFuture).flatMapMany(response -> Flux.from(response))
                        .map(e -> new DefaultDataBufferFactory().wrap(e)),
                this.publicPath, StandardOpenOption.CREATE//
        ).share().block();

        DataBufferUtils.write(//
                Mono.fromFuture(privateKeyFuture).flatMapMany(response -> Flux.from(response))
                        .map(e -> new DefaultDataBufferFactory().wrap(e)),
                this.publicPath, StandardOpenOption.CREATE//
        ).share().block();

        if (publicKeyFuture.isCompletedExceptionally() || publicKeyFuture.isCancelled())
            s3Client.close();
    }

    public static PrivateKey loadPrivateKey(Path privatePath) {
        PrivateKey privateKey = null;
        try {

            String str = Files.readAllLines(privatePath).get(1);
            PKCS8EncodedKeySpec keySpec =
                    new PKCS8EncodedKeySpec(KeyPairUtil.decoder.decode(str.getBytes()));

            privateKey = KeyFactory.getInstance("RSA").generatePrivate(keySpec);

        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return privateKey;
    }

    public static PrivateKey loadPrivateKey(String encodingPrivate) {
        PrivateKey privateKey = null;
        try {
            PKCS8EncodedKeySpec keySpec =
                    new PKCS8EncodedKeySpec(KeyPairUtil.decoder.decode(encodingPrivate.getBytes()));

            privateKey = KeyFactory.getInstance("RSA").generatePrivate(keySpec);

        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return privateKey;
    }

    public static PublicKey loadPublicKey(Path publicPath) {
        PublicKey publicKey = null;
        try {
            String str = Files.readAllLines(publicPath).get(1);
            X509EncodedKeySpec keySpec =
                    new X509EncodedKeySpec(KeyPairUtil.decoder.decode(str.getBytes()));

            publicKey = KeyFactory.getInstance("RSA").generatePublic(keySpec);

        } catch (IOException | InvalidKeySpecException | NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return publicKey;
    }

    public static PublicKey loadPublicKey(String encodingPublic) {
        PublicKey publicKey = null;
        try {

            X509EncodedKeySpec keySpec =
                    new X509EncodedKeySpec(KeyPairUtil.decoder.decode(encodingPublic.getBytes()));

            publicKey = KeyFactory.getInstance("RSA").generatePublic(keySpec);

        } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return publicKey;
    }


    public static KeyPair createKey() throws NoSuchAlgorithmException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048, new SecureRandom());
        return generator.generateKeyPair();
    }

    public static String encryptMessage(Cipher encryptCipher, String message)
            throws IllegalBlockSizeException, BadPaddingException {
        byte b[] = encryptCipher.doFinal(message.getBytes());
        return BaseEncoding.base64().encode(b);
    }

    public static KeyPairUtilBuilder builder() {
        return new KeyPairUtilBuilder();
    }

    public static void main(String a[]) throws NoSuchAlgorithmException, InvalidKeyException,
            SignatureException, InvalidKeySpecException {
        var k = new KeyPairUtil(null);
        var pair = KeyPairUtil.createKey();
        var privateK = pair.getPrivate();
        var publicK = pair.getPublic();
        String test = "test";
        byte[] b = test.getBytes();

        Signature sig = Signature.getInstance("SHA256withRSA");
        sig.initSign(privateK);
        sig.update(b);

        System.out.println(new String(b));

        byte sb[] = sig.sign();

        String base = BaseEncoding.base64().encode(sb);

        System.out.println(base);

        Signature pubSig = Signature.getInstance("SHA256withRSA");
        pubSig.initVerify(publicK);
        pubSig.update(b);

        System.out.println(new String(b));

        System.out.println(pubSig.verify(BaseEncoding.base64().decode(base)));

        System.out.println(new String(b));
    }
}
