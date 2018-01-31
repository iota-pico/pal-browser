[@iota-pico/pal-browser](../README.md) > [BrowserNetworkClient](../classes/browsernetworkclient.md)



# Class: BrowserNetworkClient


Default implementation of a node client.
*__interface__*: 


## Implements

* `INetworkClient`

## Index

### Constructors

* [constructor](browsernetworkclient.md#constructor)


### Methods

* [postJson](browsernetworkclient.md#postjson)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new BrowserNetworkClient**(networkEndPoint: *`INetworkEndPoint`*): [BrowserNetworkClient](browsernetworkclient.md)


*Defined in [network/browserNetworkClient.ts:10](https://github.com/iotaeco/iota-pico-pal-browser/blob/24df3e4/src/network/browserNetworkClient.ts#L10)*



Create an instance of BrowserNetworkClient.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| networkEndPoint | `INetworkEndPoint`   |  The endpoint to use for the client. |





**Returns:** [BrowserNetworkClient](browsernetworkclient.md)

---


## Methods
<a id="postjson"></a>

###  postJson

► **postJson**T,U(data: *`T`*, additionalHeaders?: *`object`*): `Promise`.<`U`>



*Defined in [network/browserNetworkClient.ts:31](https://github.com/iotaeco/iota-pico-pal-browser/blob/24df3e4/src/network/browserNetworkClient.ts#L31)*



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


