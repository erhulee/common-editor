
function* createIDMachine() {
    for (let i = 100; true; i++) {
        yield i
    }
}

const IDMachine = createIDMachine();
export function useId() {
    console.log("!!!", IDMachine.next().value)
    return IDMachine.next().value
}