var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1DcnlwdG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL3BsYXRmb3JtQ3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNEVBQXlFO0FBQ3pFLDRFQUF5RTtBQUV6RSwrQ0FBaUM7QUFFakM7O0dBRUc7QUFDSDtJQU9JOzs7O09BSUc7SUFDSCxZQUFZLFNBQWlCLEVBQUUsVUFBbUI7UUFDOUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxPQUFPLENBQUMsSUFBWTtRQUN2QixJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QyxNQUFNLElBQUksNkJBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksNkJBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNsRSxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxPQUFPLENBQUMsSUFBWTtRQUN2QixJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDakYsTUFBTSxJQUFJLDZCQUFhLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUNyRjtRQUNELElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLDZCQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUNsRTtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRixPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxJQUFJLENBQUMsSUFBWTtRQUNwQixJQUFJLDJCQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN4QyxNQUFNLElBQUksNkJBQWEsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksNkJBQWEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxJQUFZLEVBQUUsU0FBaUI7UUFDekMsSUFBSSwyQkFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsTUFBTSxJQUFJLDZCQUFhLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUN2RTtRQUNELElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLDZCQUFhLENBQUMscUNBQXFDLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksMkJBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDakMsTUFBTSxJQUFJLDZCQUFhLENBQUMsMENBQTBDLENBQUMsQ0FBQztTQUN2RTtRQUNELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNKO0FBeEZELHdDQXdGQyJ9