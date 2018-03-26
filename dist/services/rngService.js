Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of random number generation service.
 */
class RngService {
    /**
     * Create a new instance of RngService.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm5nU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9ybmdTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTs7R0FFRztBQUNIO0lBSUk7O09BRUc7SUFDSCxZQUFZLFlBQTJCO1FBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxRQUFRLENBQUMsTUFBYztRQUMxQixNQUFNLEdBQUcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkQsQ0FBQztDQUNKO0FBcEJELGdDQW9CQyJ9