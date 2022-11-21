export function nextFrame(fn: () => void) {
    requestAnimationFrame(() => {
        requestAnimationFrame(fn);
    });
}
export const delay = (fn: () => void, delay = 0) => {
    if (delay === 0 || isNaN(delay)) {
        return fn();
    }
    setTimeout(() => {
        fn();
    }, delay);
};
