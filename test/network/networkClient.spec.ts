/**
 * Tests for NetworkClient.
 */
import { NetworkEndPoint } from "@iota-pico/core/dist/network/networkEndPoint";
import * as chai from "chai";
import { NetworkClient } from "../../src/network/networkClient";

declare var global: any;

class FakeXMLHttpRequest {
    public headers: { [header: string]: string };
    public readyState: number;
    public status: number;
    public sentData: string;
    public responseText: string;
    public timeout: number;
    public uri: string;

    public onload: () => void;
    public ontimeout: () => void;
    public onerror: (err: Error) => void;

    public open(method: string, uri: string, async: boolean): void {
        this.uri = uri;
        this.headers = {};
    }

    public setRequestHeader(header: string, value: string): void {
        this.headers[header] = value;
    }

    public send(data: string): void {
        if (this.readyState === undefined) {
            this.readyState = 0;
        }
        if (this.status === undefined) {
            this.status = 200;
        }

        this.sentData = data;

        if (this.timeout > 0) {
            setTimeout(
                () => {
                    this.ontimeout();
                },
                1);
        }
        if (this.responseText === null) {
            this.onerror(new Error("err!"));
        } else {
            const interval = setInterval(
                () => {
                    this.readyState++;
                    if (this.readyState === 1) {
                        clearInterval(interval);
                    }
                    this.onload();
                },
                1);
        }
    }
}

describe("NetworkClient", () => {
    let xhr: FakeXMLHttpRequest;

    beforeEach(() => {
        xhr = new FakeXMLHttpRequest();
        // tslint:disable-next-line:function-name
        function XMLHttpRequest(): FakeXMLHttpRequest {
            return xhr;
        }
        global.XMLHttpRequest = XMLHttpRequest;
    });

    it("can be created", () => {
        const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
        chai.should().exist(obj);
    });

    it("can fail to create with no endpoint", () => {
        chai.expect(() => new NetworkClient(undefined)).to.throw("must be defined");
    });

    it("can fail to create with invalid timeout", () => {
        chai.expect(() => new NetworkClient(new NetworkEndPoint("http", "localhost", 14265), undefined, -1)).to.throw(">= 0");
    });

    describe("get", () => {
        it("can get data", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "foo";
            const ret = await obj.get();
            chai.expect(ret).to.be.equal("foo");
        });

        it("can get data with headers", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "foo";
            const ret = await obj.get(undefined, undefined, { bar: "123" });
            chai.expect(ret).to.be.equal("foo");
            chai.expect(xhr.headers.bar).to.be.equal("123");
        });

        it("can fail during send", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = null;
            try {
                await obj.get(undefined, undefined, { bar: "123" });
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("Failed GET request");
            }
        });

        it("can take time to return data", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "foo";
            xhr.readyState = -2;
            const ret = await obj.get();
            chai.expect(ret).to.be.equal("foo");
        });

        it("can fail to with invalid response", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.status = 404;
            try {
                await obj.get();
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("Failed GET request");
            }
        });

        it("can timeout", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265), undefined, 1);
            try {
                await obj.get();
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("timed out");
            }
        });

        it("can get with additional path", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265, "//pop//"));
            xhr.responseText = "foo";
            const ret = await obj.get(undefined, "////path", { bar: "123" });
            chai.expect(ret).to.be.equal("foo");
            chai.expect(xhr.uri).to.be.equal("http://localhost:14265/pop/path");
            chai.expect(xhr.headers.bar).to.be.equal("123");
        });

        it("can get with empty parameters", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265, "//pop//"));
            xhr.responseText = "foo";
            const ret = await obj.get({});
            chai.expect(ret).to.be.equal("foo");
            chai.expect(xhr.uri).to.be.equal("http://localhost:14265/pop");
        });

        it("can get with parameters", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265, "//pop//"));
            xhr.responseText = "foo";
            const ret = await obj.get({
                "a param": 2,
                "b param": true,
                "c param": null
            });
            chai.expect(ret).to.be.equal("foo");
            chai.expect(xhr.uri).to.be.equal("http://localhost:14265/pop?a%20param=2&b%20param=true&c%20param=");
        });
    });

    describe("post", () => {
        it("can post data", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "foo";
            const ret = await obj.post("blah");
            chai.expect(ret).to.be.equal("foo");
        });

        it("can post data with headers", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "foo";
            const ret = await obj.post("blah", undefined, { bar: "123" });
            chai.expect(ret).to.be.equal("foo");
            chai.expect(xhr.headers.bar).to.be.equal("123");
        });

        it("can fail during send", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = null;
            try {
                await obj.post("blah", undefined, { bar: "123" });
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("Failed POST request");
            }
        });

        it("can take time to return data", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "foo";
            xhr.readyState = -2;
            const ret = await obj.post("blah");
            chai.expect(ret).to.be.equal("foo");
        });

        it("can fail to with invalid response", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.status = 404;
            try {
                await obj.post("blah");
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("Failed POST request");
            }
        });

        it("can timeout", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265), undefined, 1);
            try {
                await obj.post("blah");
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("timed out");
            }
        });
    });

    describe("json", () => {
        it("can get data", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "{ \"foo\": 123 }";
            const ret = await obj.json(undefined, "GET");
            chai.expect(ret).to.be.deep.equal({ foo: 123 });
        });

        it("can fail when JSON.parse fails", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "!";
            try {
                await obj.json(undefined, "GET");
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("Failed GET request, unable to parse response");
            }
        });
    });

    describe("post", () => {
        it("can post data", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "{ \"foo\": 123 }";
            const ret = await obj.json({ bar: true }, "POST");
            chai.expect(ret).to.be.deep.equal({ foo: 123 });
            chai.expect(xhr.headers["Content-Type"]).to.be.equal("application/json");
        });

        it("can fail when JSON.parse fails", async () => {
            const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", 14265));
            xhr.responseText = "!";
            try {
                await obj.json({ bar: true }, "POST");
                chai.assert("should not be here");
            } catch (err) {
                chai.expect(err.message).to.contain("Failed POST request, unable to parse response");
            }
        });
    });
});
