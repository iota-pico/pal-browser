/**
 * Tests for PlatformCrypto.
 */
import * as chai from "chai";
import { PlatformCrypto } from "../../src/crypto/platformCrypto";

describe("PlatformCrypto", () => {
    const pubKey: string = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCyfCxX3CmLJY94denNTw/sPMjn
MXu1Mtofxu7doZ4irCUjg1a/KaV6N2sXlEwVGnMNDWH44tRmyhX8UskC+JZK52Qs
tNJ9ZcWQ+ToZerYGceGSvw5IpTr0daFcTZ6cboSXXRuAOjEMQDo5Kgyx1DsvmD2v
ZUy+fq57jUKP6BsgUwIDAQAB
-----END PUBLIC KEY-----`;
    const privKey: string = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCyfCxX3CmLJY94denNTw/sPMjnMXu1Mtofxu7doZ4irCUjg1a/
KaV6N2sXlEwVGnMNDWH44tRmyhX8UskC+JZK52QstNJ9ZcWQ+ToZerYGceGSvw5I
pTr0daFcTZ6cboSXXRuAOjEMQDo5Kgyx1DsvmD2vZUy+fq57jUKP6BsgUwIDAQAB
AoGAQa5KTya4rvjqfATAPgpLLL8Nm25tPLfy5uC5BBw2akH5BMGPSZeUyo3cPfgX
q2hpUDNNi15FlXHmd00rpYk/HMDLcybhmO2iS2DRxxy2vhkHOx9gEEqQfqGnm61S
+bb8KLmFuI2ztI0kiwO6UMah5AkrWwKOr9EU71bEooBErnECQQDyV0bt7BEePsnv
DlT88lMEiqVrsdu8QeJCx2UM02PyfkzagUhuNRoWNPsY5sqYeVYkPUoVmZRutQoh
prFexCWrAkEAvIuGBClUsMrRqf+GeUPo7cFfMi/7+1w5FForV1quTMSu7kEStCwS
QTEcu7c3VYtd132z9Uu6gz6S1CJeOXB3+QJBAK1s8AGMEqQGYxSEuSVbdTWm0sLD
QXDz5SvM7e/Dx57d67njEyZrMgP6XkdvwkRjcNX2VnImuiaPwHRciko7LIkCQGN2
BsBzPSX2GBxhm4Kk/F9PvvQus/Kpd8LwviRaxc/hgZZV5ZP+G7MgQVQVFq+d0Wc3
/JLN3BoYDESzzJjoZ6ECQQCl0g/OlM906x7Ij7YCzvIhKd+GLpWZZFC6L3shKci9
grhMNK8e1wugeCoWv1HIQiANmTDeillhoXqKNHoPy7+G
-----END RSA PRIVATE KEY-----`;

    it("can be created", () => {
        const obj = new PlatformCrypto(undefined);
        chai.should().exist(obj);
    });

    describe("encrypt", () => {
        it("can fail with no private key", async () => {
            const obj = new PlatformCrypto(undefined, undefined);
            chai.expect(() => obj.encrypt(undefined)).to.throw("privateKey");
        });

        it("can fail with no data", async () => {
            const obj = new PlatformCrypto(undefined, privKey);
            chai.expect(() => obj.encrypt(undefined)).to.throw("data");
        });

        it("can encrypt", async () => {
            const obj = new PlatformCrypto(undefined, privKey);
            const encrypted = obj.encrypt("blah blah");
            // tslint:disable-next-line:max-line-length
            chai.expect(encrypted).to.be.equal("4e05f19b538c1831bf8b893bdf2776166fd8ccc9053c88548dbf1e61efa4154918832a95ffb556e080c7bc4a5fc11c5724dad4b84b4379d87004d86d0986fba994763ee396a557b087efafaf7b44adef4505d93f38ae9599f60d8fb261ac69809e0cba9a9b30d265b94a70c7720f31903077ebe0a2b2f250031f2ccdae9c21e0");
        });
    });

    describe("decrypt", () => {
        it("can fail with no private or public key", async () => {
            const obj = new PlatformCrypto(undefined, undefined);
            chai.expect(() => obj.decrypt(undefined)).to.throw("privateKey");
        });

        it("can fail with no data and private key", async () => {
            const obj = new PlatformCrypto(undefined, privKey);
            chai.expect(() => obj.decrypt(undefined)).to.throw("data");
        });

        it("can fail with no data and public key", async () => {
            const obj = new PlatformCrypto(pubKey, undefined);
            chai.expect(() => obj.decrypt(undefined)).to.throw("data");
        });

        it("can decrypt with private key", async () => {
            const obj = new PlatformCrypto(undefined, privKey);
            // tslint:disable-next-line:max-line-length
            const decrypted = obj.decrypt("4e05f19b538c1831bf8b893bdf2776166fd8ccc9053c88548dbf1e61efa4154918832a95ffb556e080c7bc4a5fc11c5724dad4b84b4379d87004d86d0986fba994763ee396a557b087efafaf7b44adef4505d93f38ae9599f60d8fb261ac69809e0cba9a9b30d265b94a70c7720f31903077ebe0a2b2f250031f2ccdae9c21e0");
            chai.expect(decrypted).to.be.equal("blah blah");
        });

        it("can decrypt with public key", async () => {
            const obj = new PlatformCrypto(pubKey, undefined);
            // tslint:disable-next-line:max-line-length
            const decrypted = obj.decrypt("4e05f19b538c1831bf8b893bdf2776166fd8ccc9053c88548dbf1e61efa4154918832a95ffb556e080c7bc4a5fc11c5724dad4b84b4379d87004d86d0986fba994763ee396a557b087efafaf7b44adef4505d93f38ae9599f60d8fb261ac69809e0cba9a9b30d265b94a70c7720f31903077ebe0a2b2f250031f2ccdae9c21e0");
            chai.expect(decrypted).to.be.equal("blah blah");
        });
    });

    describe("sign", () => {
        it("can fail with no private key", async () => {
            const obj = new PlatformCrypto(undefined, undefined);
            chai.expect(() => obj.sign(undefined)).to.throw("privateKey");
        });

        it("can fail with no data", async () => {
            const obj = new PlatformCrypto(undefined, privKey);
            chai.expect(() => obj.sign(undefined)).to.throw("data");
        });

        it("can sign", async () => {
            const obj = new PlatformCrypto(undefined, privKey);
            const signed = obj.sign("blah blah");
            // tslint:disable-next-line:max-line-length
            chai.expect(signed).to.be.equal("7e46cc4a8716d5efdc36cb9c6ceff46a6d5b31fb311f616d750ca684a228958df64d40b78900e5839c14a898eb75eb7b03d1ed63ff0b41c43f86b0d2ee12e34690077f8c7137f5dee7505b25f1a152b00829a4bb4be943d05bcbee7e0f8eb3646b14599564e9d1e86446d902dcd9b68902ddcf85d44f1b9b71f27b0d59c786c6");
        });
    });

    describe("verify", () => {
        it("can fail with no public key", async () => {
            const obj = new PlatformCrypto(undefined, undefined);
            chai.expect(() => obj.verify(undefined, undefined)).to.throw("publicKey");
        });

        it("can fail with no data and public key", async () => {
            const obj = new PlatformCrypto(pubKey, undefined);
            chai.expect(() => obj.verify(undefined, undefined)).to.throw("data");
        });

        it("can fail with data, no signature and public key", async () => {
            const obj = new PlatformCrypto(pubKey, undefined);
            chai.expect(() => obj.verify("aaa", undefined)).to.throw("signature");
        });

        it("can fail to verify", async () => {
            const obj = new PlatformCrypto(pubKey, undefined);
            // tslint:disable-next-line:max-line-length
            const verified = obj.verify("blah blah 2", "7e46cc4a8716d5efdc36cb9c6ceff46a6d5b31fb311f616d750ca684a228958df64d40b78900e5839c14a898eb75eb7b03d1ed63ff0b41c43f86b0d2ee12e34690077f8c7137f5dee7505b25f1a152b00829a4bb4be943d05bcbee7e0f8eb3646b14599564e9d1e86446d902dcd9b68902ddcf85d44f1b9b71f27b0d59c786c6");
            chai.expect(verified).to.be.equal(false);
        });

        it("can verify with public key", async () => {
            const obj = new PlatformCrypto(pubKey, undefined);
            // tslint:disable-next-line:max-line-length
            const verified = obj.verify("blah blah", "7e46cc4a8716d5efdc36cb9c6ceff46a6d5b31fb311f616d750ca684a228958df64d40b78900e5839c14a898eb75eb7b03d1ed63ff0b41c43f86b0d2ee12e34690077f8c7137f5dee7505b25f1a152b00829a4bb4be943d05bcbee7e0f8eb3646b14599564e9d1e86446d902dcd9b68902ddcf85d44f1b9b71f27b0d59c786c6");
            chai.expect(verified).to.be.equal(true);
        });
    });
});
