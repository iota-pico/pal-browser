Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of random number generation service.
 */
class RngService {
    /**
     * Create a new instance of RngService.
     * @param randomSource The source for the random generator.
     */
    constructor(randomSource) {
        this._randomSource = randomSource || window.crypto;
    }
    /**
     * Generate an array of random numbers.
     * @param length The number of numbers to generate.
     * @returns Array of random number generators.
     */
    generate(length) {
        const arr = new Uint8Array(length);
        return this._randomSource.getRandomValues(arr);
    }
}
exports.RngService = RngService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm5nU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ybmdTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTs7R0FFRztBQUNIO0lBSUk7OztPQUdHO0lBQ0gsWUFBWSxZQUF5QjtRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksUUFBUSxDQUFDLE1BQWM7UUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsT0FBbUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKO0FBckJELGdDQXFCQyJ9