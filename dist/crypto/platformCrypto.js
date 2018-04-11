var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const platformError_1 = require("@iota-pico/core/dist/error/platformError");
const stringHelper_1 = require("@iota-pico/core/dist/helpers/stringHelper");
const crypto = __importStar(require("crypto"));
/**
 * Implementation of a platform crypto for use in NodeJS.
 */
class PlatformCrypto {
    /**
     * Create a new instance of PlatformCrypto.
     * @param publicKey The key to use for decoding data.
     * @param privateKey The key to use for encoding data.
     */
    constructor(publicKey, privateKey) {
        this._privateKey = privateKey;
        this._publicKey = publicKey;
    }
    /**
     * Encrypt the given data.
     * @param data The data to encrypt.
     * @returns The encrypted data.
     */
    encrypt(data) {
        if (stringHelper_1.StringHelper.isEmpty(this._privateKey)) {
            throw new platformError_1.PlatformError("The privateKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    decrypt(data) {
        if (stringHelper_1.StringHelper.isEmpty(this._privateKey) && stringHelper_1.StringHelper.isEmpty(this._publicKey)) {
            throw new platformError_1.PlatformError("The privateKey or publicKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    sign(data) {
        if (stringHelper_1.StringHelper.isEmpty(this._privateKey)) {
            throw new platformError_1.PlatformError("The privateKey must be a non empty string");
        }
        if (stringHelper_1.StringHelper.isEmpty(data)) {
            throw new platformError_1.PlatformError("The data must be a non empty string");
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
    verify(data, signature) {
        if (stringHelper_1.StringHelper.isEmpty(this._publicKey)) {
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
        return verifier.verify(this._publicKey, signature, "hex");
    }
}
exports.PlatformCrypto = PlatformCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1DcnlwdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL3BsYXRmb3JtQ3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUV6RSwrQ0FBaUM7QUFFakM7O0dBRUc7QUFDSDtJQU9JOzs7O09BSUc7SUFDSCxZQUFZLFNBQWlCLEVBQUUsVUFBbUI7UUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxPQUFPLENBQUMsSUFBWTtRQUN2QixFQUFFLENBQUMsQ0FBQywyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sSUFBSSw2QkFBYSxDQUFDLDJDQUEyQyxDQUFDLENBQUM7UUFDekUsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLDJCQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLElBQUksNkJBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1FBQ25FLENBQUM7UUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDekMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksT0FBTyxDQUFDLElBQVk7UUFDdkIsRUFBRSxDQUFDLENBQUMsMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDJC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