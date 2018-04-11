import { IPlatformCrypto } from "@iota-pico/core/dist/interfaces/IPlatformCrypto";
/**
 * Implementation of a platform crypto for use in NodeJS.
 */
export declare class PlatformCrypto implements IPlatformCrypto {
    /**
     * Create a new instance of PlatformCrypto.
     * @param publicKey The key to use for decoding data.
     * @param privateKey The key to use for encoding data.
     */
    constructor(publicKey: string, privateKey?: string);
    /**
     * Encrypt the given data.
     * @param data The data to encrypt.
     * @returns The encrypted data.
     */
    encrypt(data: string): string;
    /**
     * Decrypt the given data.
     * @param data The data to decrypt.
     * @returns The decrypted data.
     */
    decrypt(data: string): string;
    /**
     * Sign the given data.
     * @param data The data to sign.
     * @returns The signature.
     */
    sign(data: string): string;
    /**
     * Verify the given data.
     * @param data The data to verify.
     * @param signature The signature to verify againt the data.
     * @returns True if the verification is successful.
     */
    verify(data: string, signature: string): boolean;
}
