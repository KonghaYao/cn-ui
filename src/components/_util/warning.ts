export default function warning(condition, message: string) {
    if (console) {
        if (condition) {
            console.error(`[cn-ui]: ${message}`);
        }
    }
}
