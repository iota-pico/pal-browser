[@iota-pico/pal-browser](../README.md) > [RngService](../classes/rngservice.md)



# Class: RngService


Implementation of random number generation service.

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


### ⊕ **new RngService**(randomSource?: *`RandomSource`*): [RngService](rngservice.md)


*Defined in [services/rngService.ts:8](https://github.com/iotaeco/iota-pico-pal-browser/blob/8fc2a0e/src/services/rngService.ts#L8)*



Create a new instance of RngService.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| randomSource | `RandomSource`   |  - |





**Returns:** [RngService](rngservice.md)

---


## Methods
<a id="generate"></a>

###  generate

► **generate**(length: *`number`*): `Uint8Array`



*Defined in [services/rngService.ts:22](https://github.com/iotaeco/iota-pico-pal-browser/blob/8fc2a0e/src/services/rngService.ts#L22)*



Generate an array of random numbers.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| length | `number`   |  The number of numbers to generate. |





**Returns:** `Uint8Array`
Array of random number generators.






___


