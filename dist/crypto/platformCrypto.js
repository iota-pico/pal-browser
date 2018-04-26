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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1DcnlwdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL3BsYXRmb3JtQ3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUN6RSw0RUFBeUU7QUFFekUsK0NBQWlDO0FBRWpDOztHQUVHO0FBQ0g7SUFDSTs7Ozs7T0FLRztJQUNJLE9BQU8sQ0FBQyxVQUFrQixFQUFFLElBQVk7UUFDM0MsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQyxNQUFNLElBQUksNkJBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksNkJBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVELE9BQU8sU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxPQUFPLENBQUMsU0FBaUIsRUFBRSxJQUFZO1FBQzFDLElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLDZCQUFhLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLDZCQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUNsRTtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElB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