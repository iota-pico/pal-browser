import { PlatformError } from "@iota-pico/core/dist/error/platformError";
import { StringHelper } from "@iota-pico/core/dist/helpers/stringHelper";
import { IPlatformCrypto } from "@iota-pico/core/dist/interfaces/IPlatformCrypto";
import * as crypto from "crypto";

/**
 * Implementation of a platform crypto for use in NodeJS.
 */
export class PlatformCrypto implements IPlatformCrypto {
    /* @internal */
    private readonly _publicKey: string;

    /* @internal */
    private readonly _privateKey: string;

    /**
     * Create a new instance of PlatformCrypto.
     * @param publicKey The key to use for decoding data.
     * @param privateKey The key to use for encoding data.
     */
    constructor(publicKey: string, privateKey?: string) {
        this._privateKey = privateKey;
        this._publicKey = publicKey;
    }

    /**
     * Encrypt the given data.
     * @param data The data to encrypt.
     * @returns The encrypted data.
     */
    public encrypt(data: string): string {
        if (StringHelper.isEmpty(this._privateKey)) {
            throw new PlatformError("The privateKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        const buffer = new Buffer(data, "ascii");
        const encrypted = crypto.privateEncrypt(this._privateKey, buffer);
        return encrypted.toString("hex");
    }

    /**
     * Decrypt the given data.
     * @param data The data to decrypt.
     * @returns The decrypted data.
     */
    public decrypt(data: string): string {
        if (StringHelper.isEmpty(this._privateKey) && StringHelper.isEmpty(this._publicKey)) {
            throw new PlatformError("The privateKey or publicKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        const buffer = new Buffer(data, "hex");
        const decrypted = crypto.publicDecrypt(this._publicKey || this._privateKey, buffer);
        return decrypted.toString("ascii");
    }

    /**
     * Sign the given data.
     * @param data The data to sign.
     * @returns The signature.
     */
    public sign(data: string): string {
        if (StringHelper.isEmpty(this._privateKey)) {
            throw new PlatformError("The privateKey must be a non empty string");
        }
        if (StringHelper.isEmpty(data)) {
            throw new PlatformError("The data must be a non empty string");
        }
        const signer = crypto.createSign("RSA-SHA256");
        signer.update(data);
        return signer.sign(this._privateKey, "hex");
    }

    /**
     * Verify the given data.
     * @param data The data to verify.
     * @param signature The signature to verify againt the data.
     * @returns True if the verification is successful.
     */
    public verify(data: string, signature: string): boolean {
        if (StringHelper.isEmpty(this._publicKey)) {
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
        return verifier.verify(this._publicKey, signature, "hex");
    }
}
