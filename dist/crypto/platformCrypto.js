var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platformError_1 = require("@iota-pico/core/dist/error/platformError");
const objectHelper_1 = require("@iota-pico/core/dist/helpers/objectHelper");
const stringHelper_1 = require("@iota-pico/core/dist/helpers/stringHelper");
const crypto = __importStar(require("crypto"));
/**
 * Implementation of a platform crypto for use in NodeJS.
 */
class PlatformCrypto {
    /**
     * Encrypt the given data.
     * @param privateKey The key to use for encrypting data.
     * @param data The data to encrypt.
     * @returns The encrypted data.
     */
    encrypt(privateKey, data) {
        if (stringHelper_1.StringHelper.isEmpty(privateKey)) {
            throw new platformError_1.PlatformError("The privateKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    decrypt(publicKey, data) {
        if (stringHelper_1.StringHelper.isEmpty(publicKey)) {
            throw new platformError_1.PlatformError("The publicKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    sign(privateKey, data) {
        if (stringHelper_1.StringHelper.isEmpty(privateKey)) {
            throw new platformError_1.PlatformError("The privateKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    verify(publicKey, data, signature) {
        if (stringHelper_1.StringHelper.isEmpty(publicKey)) {
            throw new platformError_1.PlatformError("The publicKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(signature)) {
            throw new platformError_1.PlatformError("The signature must be a non empty string");
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
    hash(algo, data, dataType, encoding) {
        if (stringHelper_1.StringHelper.isEmpty(algo)) {
            throw new platformError_1.PlatformError("The algo must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    hmac(algo, key, data, dataType, encoding) {
        if (stringHelper_1.StringHelper.isEmpty(algo)) {
            throw new platformError_1.PlatformError("The algo must be a non empty string");
        }
        if (objectHelper_1.ObjectHelper.isEmpty(key)) {
            throw new platformError_1.PlatformError("The key must be non empty");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
        }
        return crypto.createHmac(algo, key)
            .update(data, dataType)
            .digest(encoding);
    }
}
exports.PlatformCrypto = PlatformCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1DcnlwdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL3BsYXRmb3JtQ3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUN6RSw0RUFBeUU7QUFFekUsK0NBQWlDO0FBRWpDOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0lBQ3ZCOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLFVBQWtCLEVBQUUsSUFBWTtRQUMzQyxJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2xDLE1BQU0sSUFBSSw2QkFBYSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDeEU7UUFDRCxJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLE1BQU0sSUFBSSw2QkFBYSxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDbEU7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUQsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE9BQU8sQ0FBQyxTQUFpQixFQUFFLElBQVk7UUFDMUMsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNqQyxNQUFNLElBQUksNkJBQWEsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQ3ZFO1FBQ0QsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksNkJBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxN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