/**
 * Tests for NetworkClient.
 */
import { NetworkEndPoint } from "@iota-pico/core/dist/network/networkEndPoint";
import * as chai from "chai";
import { NetworkClient } from "../../src/network/networkClient";

describe("NetworkClient", () => {
    it("can be created", () => {
        const obj = new NetworkClient(new NetworkEndPoint("http", "localhost", undefined, 14265));
        chai.should().exist(obj);
    });
});
