import { IRngService } from "@iota-pico/core/dist/interfaces/IRngService";
import { IRngSource } from "./IRngSource";
/**
 * Implementation of random number generation service.
 */
export declare class RngService implements IRngService {
    /**
     * Create a new instance of RngService.
     */
    constructor(randomSource?: IRngSource);
    /**
     * Generate an array of random numbers.
     * @param length The number of numbers to generate.
     * @returns Array of random number generators.
     */
    generate(length: number): Uint8Array;
}