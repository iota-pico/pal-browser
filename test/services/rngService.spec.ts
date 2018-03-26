/**
 * Tests for RngService.
 */
import * as chai from "chai";
//import * as global from "node";
import { RngService } from "../../src/services/rngService";

describe("RngService", () => {
    it("can be created", () => {
        global.window = {};
        const obj = new RngService();
        chai.should().exist(obj);
    });

    describe("generate", () => {
        it("can generate random number", () => {
            const obj = new RngService({getRandomValues: (arr) => arr});
            const res = obj.generate(10);
            chai.expect(res.length).to.equal(10);
        });
    });
});
