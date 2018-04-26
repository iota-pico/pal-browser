import { IRngService } from "@iota-pico/core/dist/interfaces/IRngService";
import { IRngSource } from "../interfaces/IRngSource";

/**
 * Implementation of random number generation service.
 */
export class RngService implements IRngService {
    /* @internal */
    private readonly _randomSource: IRngSource;

    /**
     * Create a new instance of RngService.
     * @param randomSource The source for the random generator.
     */
    constructor(randomSource?: IRngSource) {
        this._randomSource = randomSource || window.crypto;
    }

    /**
     * Generate an array of random numbers.
     * @param length The number of numbers to generate.
     * @returns Array of random number generators.
     */
    public generate(length: number): Uint8Array {
        const arr = new Uint8Array(length);
        return <Uint8Array>this._randomSource.getRandomValues(arr);
    }
}
