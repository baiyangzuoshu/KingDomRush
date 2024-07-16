/**
 * Utilities module containing helper functions.
 */
export const utils = {
    /**
     * Generates a random integer within the specified range [start, end].
     * @param start - The start of the range.
     * @param end - The end of the range.
     * @returns A random integer between start and end (inclusive).
     */
    random_int(start: number, end: number): number {
        let num = start + Math.random() * (end - start + 1); // [0, 1]
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        return num;
    }
};
