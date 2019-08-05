/**
 * Shuffle array using Fisher-Yates shuffle algorithm
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export const shuffle = <T>(arr: T[]): T[] =>
    arr.reduce(
        (arr, _, currentIndex) => {
            const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

            // Swap values
            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];

            return arr;
        },
        [...arr],
    );

export const stringSort = (a: string, b: string): number => (a === b ? 0 : a > b ? 1 : -1);
