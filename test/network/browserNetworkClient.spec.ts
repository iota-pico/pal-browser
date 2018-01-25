/**
 * Tests for BrowserNetworkClient.
 */
import { NetworkEndPoint } from "@iota-pico/core/dist/network/networkEndPoint";
import * as chai from "chai";
import { BrowserNetworkClient } from "../../src/network/browserNetworkClient";

describe("BrowserNetworkClient", () => {
    it("can be created", () => {
        const obj = new BrowserNetworkClient(new NetworkEndPoint("http", "localhost", undefined, 14265));
        chai.should().exist(obj);
    });
});
