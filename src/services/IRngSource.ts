/**
 * Default tye for rng srouce.
 */

export interface IRngSource {
    getRandomValues(
    array: Int8Array |
        Int16Array |
        Int32Array |
        Uint8Array |
        Uint16Array |
        Uint32Array |
        Uint8ClampedArray |
        Float32Array |
        Float64Array |
        DataView |
        null):
    Int8Array |
    Int16Array |
    Int32Array |
    Uint8Array |
    Uint16Array |
    Uint32Array |
    Uint8ClampedArray |
    Float32Array |
    Float64Array |
    DataView | null;
}
