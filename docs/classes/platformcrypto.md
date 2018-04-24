[@iota-pico/pal-browser](../README.md) > [PlatformCrypto](../classes/platformcrypto.md)

# Class: PlatformCrypto

Implementation of a platform crypto for use in NodeJS.

## Hierarchy

**PlatformCrypto**

## Implements

* `IPlatformCrypto`

## Index

### Constructors

* [constructor](platformcrypto.md#constructor)

### Methods

* [decrypt](platformcrypto.md#decrypt)
* [encrypt](platformcrypto.md#encrypt)
* [sign](platformcrypto.md#sign)
* [verify](platformcrypto.md#verify)

---

## Constructors

<a id="constructor"></a>

### ⊕ **new PlatformCrypto**(publicKey: *`string`*, privateKey?: *`string`*): [PlatformCrypto](platformcrypto.md)

*Defined in [crypto/platformCrypto.ts:14](https://github.com/iota-pico/pal-browser/blob/c77245a/src/crypto/platformCrypto.ts#L14)*

Create a new instance of PlatformCrypto.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| publicKey | `string`   |  The key to use for decoding data. |
| privateKey | `string`   |  The key to use for encoding data. |

**Returns:** [PlatformCrypto](platformcrypto.md)

---

## Methods

<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(data: *`string`*): `string`

*Defined in [crypto/platformCrypto.ts:48](https://github.com/iota-pico/pal-browser/blob/c77245a/src/crypto/platformCrypto.ts#L48)*

Decrypt the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `string`   |  The data to decrypt. |

**Returns:** `string`
The decrypted data.

___

<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(data: *`string`*): `string`

*Defined in [crypto/platformCrypto.ts:31](https://github.com/iota-pico/pal-browser/blob/c77245a/src/crypto/platformCrypto.ts#L31)*

Encrypt the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `string`   |  The data to encrypt. |

**Returns:** `string`
The encrypted data.

___

<a id="sign"></a>

###  sign

▸ **sign**(data: *`string`*): `string`

*Defined in [crypto/platformCrypto.ts:65](https://github.com/iota-pico/pal-browser/blob/c77245a/src/crypto/platformCrypto.ts#L65)*

Sign the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `string`   |  The data to sign. |

**Returns:** `string`
The signature.

___

<a id="verify"></a>

###  verify

▸ **verify**(data: *`string`*, signature: *`string`*): `boolean`

*Defined in [crypto/platformCrypto.ts:83](https://github.com/iota-pico/pal-browser/blob/c77245a/src/crypto/platformCrypto.ts#L83)*

Verify the given data.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `string`   |  The data to verify. |
| signature | `string`   |  The signature to verify againt the data. |

**Returns:** `boolean`
True if the verification is successful.

___

