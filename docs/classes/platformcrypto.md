[@iota-pico/pal-browser](../README.md) > [PlatformCrypto](../classes/platformcrypto.md)

# Class: PlatformCrypto

Implementation of a platform crypto for use in NodeJS.

## Hierarchy

**PlatformCrypto**

## Implements

* `IPlatformCrypto`

## Index

### Methods

* [decrypt](platformcrypto.md#decrypt)
* [encrypt](platformcrypto.md#encrypt)
* [hash](platformcrypto.md#hash)
* [hmac](platformcrypto.md#hmac)
* [sign](platformcrypto.md#sign)
* [verify](platformcrypto.md#verify)

---

## Methods

<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(publicKey: *`string`*, data: *`string`*): `string`

*Defined in [crypto/platformCrypto.ts:35](https://github.com/iota-pico/pal-browser/blob/a722e3c/src/crypto/platformCrypto.ts#L35)*

Decrypt the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| publicKey | `string` |  The key to use for decrypting data. |
| data | `string` |  The data to decrypt. |

**Returns:** `string`
The decrypted data.

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(privateKey: *`string`*, data: *`string`*): `string`

*Defined in [crypto/platformCrypto.ts:17](https://github.com/iota-pico/pal-browser/blob/a722e3c/src/crypto/platformCrypto.ts#L17)*

Encrypt the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| privateKey | `string` |  The key to use for encrypting data. |
| data | `string` |  The data to encrypt. |

**Returns:** `string`
The encrypted data.

___
<a id="hash"></a>

###  hash

▸ **hash**(algo: *`string`*, data: *`any`*, dataType?: * "utf8" &#124; "ascii" &#124; "latin1"*, encoding?: * "latin1" &#124; "hex" &#124; "base64"*): `any`

*Defined in [crypto/platformCrypto.ts:95](https://github.com/iota-pico/pal-browser/blob/a722e3c/src/crypto/platformCrypto.ts#L95)*

Hash the data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| algo | `string` |  The algorithm to use. |
| data | `any` |  The data to hash. |
| `Optional` dataType |  "utf8" &#124; "ascii" &#124; "latin1"|  The type of the input data utf8, ascii, latin1. |
| `Optional` encoding |  "latin1" &#124; "hex" &#124; "base64"|  The encoding to return the data latin1, hex, base64. |

**Returns:** `any`
The hash of the data.

___
<a id="hmac"></a>

###  hmac

▸ **hmac**(algo: *`string`*, key: *`any`*, data: *`any`*, dataType?: * "utf8" &#124; "ascii" &#124; "latin1"*, encoding?: * "latin1" &#124; "hex" &#124; "base64"*): `any`

*Defined in [crypto/platformCrypto.ts:120](https://github.com/iota-pico/pal-browser/blob/a722e3c/src/crypto/platformCrypto.ts#L120)*

HMAC the data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| algo | `string` |  The algorithm to use. |
| key | `any` |  The key to hash the data with. |
| data | `any` |  The data to hash. |
| `Optional` dataType |  "utf8" &#124; "ascii" &#124; "latin1"|  The type of the input data utf8, ascii, latin1. |
| `Optional` encoding |  "latin1" &#124; "hex" &#124; "base64"|  The encoding to return the data latin1, hex, base64. |

**Returns:** `any`
The hash of the data.

___
<a id="sign"></a>

###  sign

▸ **sign**(privateKey: *`string`*, data: *`string`*): `string`

*Defined in [crypto/platformCrypto.ts:53](https://github.com/iota-pico/pal-browser/blob/a722e3c/src/crypto/platformCrypto.ts#L53)*

Sign the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| privateKey | `string` |  The key to use for signing data. |
| data | `string` |  The data to sign. |

**Returns:** `string`
The signature.

___
<a id="verify"></a>

###  verify

▸ **verify**(publicKey: *`string`*, data: *`string`*, signature: *`string`*): `boolean`

*Defined in [crypto/platformCrypto.ts:72](https://github.com/iota-pico/pal-browser/blob/a722e3c/src/crypto/platformCrypto.ts#L72)*

Verify the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| publicKey | `string` |  The key to use for verifying data. |
| data | `string` |  The data to verify. |
| signature | `string` |  The signature to verify againt the data. |

**Returns:** `boolean`
True if the verification is successful.

___

