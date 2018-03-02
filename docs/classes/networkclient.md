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


### ⊕ **new NetworkClient**(networkEndPoint: *`INetworkEndPoint`*): [NetworkClient](networkclient.md)


*Defined in [network/networkClient.ts:12](https://github.com/iotaeco/iota-pico-pal-browser/blob/fee799b/src/network/networkClient.ts#L12)*



Create an instance of NetworkClient.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| networkEndPoint | `INetworkEndPoint`   |  The endpoint to use for the client. |





**Returns:** [NetworkClient](networkclient.md)

---


## Methods
<a id="get"></a>

###  get

► **get**(additionalHeaders?: *`object`*): `Promise`.<`string`>



*Defined in [network/networkClient.ts:31](https://github.com/iotaeco/iota-pico-pal-browser/blob/fee799b/src/network/networkClient.ts#L31)*



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



*Defined in [network/networkClient.ts:51](https://github.com/iotaeco/iota-pico-pal-browser/blob/fee799b/src/network/networkClient.ts#L51)*



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



*Defined in [network/networkClient.ts:41](https://github.com/iotaeco/iota-pico-pal-browser/blob/fee799b/src/network/networkClient.ts#L41)*



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



*Defined in [network/networkClient.ts:74](https://github.com/iotaeco/iota-pico-pal-browser/blob/fee799b/src/network/networkClient.ts#L74)*



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


