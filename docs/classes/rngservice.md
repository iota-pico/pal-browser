[@iota-pico/pal-browser](../README.md) > [RngService](../classes/rngservice.md)

# Class: RngService

Implementation of random number generation service.

## Hierarchy

**RngService**

## Implements

* `IRngService`

## Index

### Constructors

* [constructor](rngservice.md#constructor)

### Methods

* [generate](rngservice.md#generate)

---

## Constructors

<a id="constructor"></a>

### ⊕ **new RngService**(randomSource?: *[IRngSource](../interfaces/irngsource.md)*): [RngService](rngservice.md)

*Defined in [services/rngService.ts:9](https://github.com/iota-pico/pal-browser/blob/f6aff0a/src/services/rngService.ts#L9)*

Create a new instance of RngService.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| randomSource | [IRngSource](../interfaces/irngsource.md)   |  - |

**Returns:** [RngService](rngservice.md)

---

## Methods

<a id="generate"></a>

###  generate

▸ **generate**(length: *`number`*): `Uint8Array`

*Defined in [services/rngService.ts:23](https://github.com/iota-pico/pal-browser/blob/f6aff0a/src/services/rngService.ts#L23)*

Generate an array of random numbers.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| length | `number`   |  The number of numbers to generate. |

**Returns:** `Uint8Array`
Array of random number generators.

___

