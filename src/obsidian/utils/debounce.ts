
/**
 * creates a debounced version of the provided function that 
 * delays its execution until after a specified delay in milliseconds
 * has elapsed since the last time it was invoked.
 * @param func the function to debounce
 * @param delayMs the delay in milliseconds
 * @returns a debounced version of the provided function
 */
export function debounce<Args extends unknown[]>(
    func: (...args: Args) => void,
    delayMs: number
): (...args: Args) => void {
    let timeoutId: number | undefined;

    return (...args: Args) => {
        if (timeoutId !== undefined) {
            window.clearTimeout(timeoutId);
        }
        timeoutId = window.setTimeout(() => {
            func(...args);
        }, delayMs);
    };
}