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

###  constructor

⊕ **new RngService**(randomSource?: *[IRngSource](../interfaces/irngsource.md)*): [RngService](rngservice.md)

*Defined in [services/rngService.ts:9](https://github.com/iota-pico/pal-browser/tree/master/src/services/rngService.ts#L9*

Create a new instance of RngService.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` randomSource | [IRngSource](../interfaces/irngsource.md) |  The source for the random generator. |

**Returns:** [RngService](rngservice.md)

___

## Methods

<a id="generate"></a>

###  generate

▸ **generate**(length: *`number`*): `Uint8Array`

*Defined in [services/rngService.ts:24](https://github.com/iota-pico/pal-browser/tree/master/src/services/rngService.ts#L24*

Generate an array of random numbers.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| length | `number` |  The number of numbers to generate. |

**Returns:** `Uint8Array`
Array of random number generators.

___

