
function* createIDMachine() {
    for (let i = 100; true; i++) {
        yield i
    }
}

const IDMachine = createIDMachine();
export function useId() {
    return String(IDMachine.next().value || "")
}