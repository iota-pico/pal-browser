[@iota-pico/pal-browser](../README.md) > [NetworkClient](../classes/networkclient.md)



# Class: NetworkClient


Implementation of a node client for use in the browser.
*__interface__*: 


## Implements

* `INetworkClient`

## Index

### Constructors

* [constructor](networkclient.md#constructor)


### Methods

* [get](networkclient.md#get)
* [getJson](networkclient.md#getjson)
* [post](networkclient.md#post)
* [postJson](networkclient.md#postjson)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new NetworkClient**(networkEndPoint: *`INetworkEndPoint`*, timeoutMs?: *`number`*): [NetworkClient](networkclient.md)


*Defined in [network/networkClient.ts:15](https://github.com/iotaeco/iota-pico-pal-browser/blob/6999f41/src/network/networkClient.ts#L15)*



Create an instance of NetworkClient.


**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| networkEndPoint | `INetworkEndPoint`  | - |   The endpoint to use for the client. |
| timeoutMs | `number`  | 0 |   The timeout in ms before aborting. |





**Returns:** [NetworkClient](networkclient.md)

---


## Methods
<a id="get"></a>

###  get

► **get**(additionalHeaders?: *`object`*): `Promise`.<`string`>



*Defined in [network/networkClient.ts:39](https://github.com/iotaeco/iota-pico-pal-browser/blob/6999f41/src/network/networkClient.ts#L39)*



Get data asynchronously.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| additionalHeaders | `object`   |  Extra headers to send with the request. |





**Returns:** `Promise`.<`string`>
Promise which resolves to the object returned or rejects with error.






___

<a id="getjson"></a>

###  getJson

► **getJson**U(additionalHeaders?: *`object`*): `Promise`.<`U`>



*Defined in [network/networkClient.ts:59](https://github.com/iotaeco/iota-pico-pal-browser/blob/6999f41/src/network/networkClient.ts#L59)*



Get data asynchronously.


**Type parameters:**

#### U 

The generic type for the returned object.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| additionalHeaders | `object`   |  Extra headers to send with the request. |





**Returns:** `Promise`.<`U`>
Promise which resolves to the object returned or rejects with error.






___

<a id="post"></a>

###  post

► **post**(data: *`string`*, additionalHeaders?: *`object`*): `Promise`.<`string`>



*Defined in [network/networkClient.ts:49](https://github.com/iotaeco/iota-pico-pal-browser/blob/6999f41/src/network/networkClient.ts#L49)*



Post data asynchronously.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `string`   |  The data to send. |
| additionalHeaders | `object`   |  Extra headers to send with the request. |





**Returns:** `Promise`.<`string`>
Promise which resolves to the object returned or rejects with error.






___

<a id="postjson"></a>

###  postJson

► **postJson**T,U(data: *`T`*, additionalHeaders?: *`object`*): `Promise`.<`U`>



*Defined in [network/networkClient.ts:82](https://github.com/iotaeco/iota-pico-pal-browser/blob/6999f41/src/network/networkClient.ts#L82)*



Post data asynchronously.


**Type parameters:**

#### T 

The generic type for the object to send.

#### U 

The generic type for the returned object.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| data | `T`   |  The data to send. |
| additionalHeaders | `object`   |  Extra headers to send with the request. |





**Returns:** `Promise`.<`U`>
Promise which resolves to the object returned or rejects with error.






___


