/**
 * Tests for PAL.
 */
import { NetworkClientFactory } from "@iota-pico/core/dist/factories/networkClientFactory";
import { NetworkEndPoint } from "@iota-pico/core/dist/network/networkEndPoint";
import * as chai from "chai";
import { PAL } from "../src/pal";

describe("PAL", () => {
    it("can be created", () => {
        const obj = new PAL();
        chai.should().exist(obj);
    });

    describe("intialize", () => {
        it("can be called and register network client", async () => {
            await PAL.initialize();
            chai.expect(NetworkClientFactory.instance().create("default", new NetworkEndPoint("http", "localhost", 14265))).to.not.be.equal(undefined);
        });

        it("can be called twice", async () => {
            await PAL.initialize();
            await PAL.initialize();
        });
    });
});
