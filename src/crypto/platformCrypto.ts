import { PlatformError } from "@iota-pico/core/dist/error/platformError";
import { ObjectHelper } from "@iota-pico/core/dist/helpers/objectHelper";
import { StringHelper } from "@iota-pico/core/dist/helpers/stringHelper";
import { IPlatformCrypto } from "@iota-pico/core/dist/interfaces/IPlatformCrypto";
import * as crypto from "crypto";

/**
 * Implementation of a platform crypto for use in NodeJS.
 */
export class PlatformCrypto implements IPlatformCrypto {
    /**
     * Encrypt the given data.
     * @param privateKey The key to use for encrypting data.
     * @param data The data to encrypt.
     * @returns The encrypted data.
     */
    public encrypt(privateKey: string, data: string): string {
        if (StringHelper.isEmpty(privateKey)) {
            throw new PlatformError("The privateKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        const buffer = new Buffer(data, "ascii");
        const encrypted = crypto.privateEncrypt(privateKey, buffer);
        return encrypted.toString("hex");
    }

    /**
     * Decrypt the given data.
     * @param publicKey The key to use for decrypting data.
     * @param data The data to decrypt.
     * @returns The decrypted data.
     */
    public decrypt(publicKey: string, data: string): string {
        if (StringHelper.isEmpty(publicKey)) {
            throw new PlatformError("The publicKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        const buffer = new Buffer(data, "hex");
        const decrypted = crypto.publicDecrypt(publicKey, buffer);
        return decrypted.toString("ascii");
    }

    /**
     * Sign the given data.
     * @param privateKey The key to use for signing data.
     * @param data The data to sign.
     * @returns The signature.
     */
    public sign(privateKey: string, data: string): string {
        if (StringHelper.isEmpty(privateKey)) {
            throw new PlatformError("The privateKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        const signer = crypto.createSign("RSA-SHA256");
        signer.update(data);
        return signer.sign(privateKey, "hex");
    }

    /**
     * Verify the given data.
     * @param publicKey The key to use for verifying data.
     * @param data The data to verify.
     * @param signature The signature to verify againt the data.
     * @returns True if the verification is successful.
     */
    public verify(publicKey: string, data: string, signature: string): boolean {
        if (StringHelper.isEmpty(publicKey)) {
            throw new PlatformError("The publicKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        if (StringHelper.isEmpty(signature)) {
            throw new PlatformError("The signature must be a non empty string");
        }
        const verifier = crypto.createVerify("RSA-SHA256");
        verifier.update(data);
        return verifier.verify(publicKey, signature, "hex");
    }

    /**
     * Hash the data.
     * @param algo The algorithm to use.
     * @param data The data to hash.
     * @param dataType The type of the input data utf8, ascii, latin1.
     * @param encoding The encoding to return the data latin1, hex, base64.
     * @returns The hash of the data.
     */
    public hash(algo: string,
                data: any,
                dataType?: "utf8" | "ascii" | "latin1",
                encoding?: "latin1" | "hex" | "base64"): any {
        if (StringHelper.isEmpty(algo)) {
            throw new PlatformError("The algo must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }

        return crypto.createHash(algo)
                        .update(data, dataType)
                        .digest(encoding);
    }

    /**
     * HMAC the data.
     * @param algo The algorithm to use.
     * @param key The key to hash the data with.
     * @param data The data to hash.
     * @param dataType The type of the input data utf8, ascii, latin1.
     * @param encoding The encoding to return the data latin1, hex, base64.
     * @returns The hash of the data.
     */
    public hmac(algo: string,
                key: any,
                data: any,
                dataType?: "utf8" | "ascii" | "latin1",
                encoding?: "latin1" | "hex" | "base64"): any {
        if (StringHelper.isEmpty(algo)) {
            throw new PlatformError("The algo must be a non empty string");
        }
        if (ObjectHelper.isEmpty(key)) {
            throw new PlatformError("The key must be non empty");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }

        return crypto.createHmac(algo, key)
                        .update(data, dataType)
                        .digest(encoding);
    }
}
