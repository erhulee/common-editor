export class PathCommand {
    command: string
    params: Array<[number, number]>

    constructor(command: string, params: Array<[number, number]>) {
        this.command = command
        this.params = params
    }

    toString() {
        return this.command + this.params.map(item => item.join(",")).join(" ")
    }

    static compose(...command: PathCommand[]) {
        return command.map(i => i.toString()).join(" ")
    }

    static Move(x: number, y: number) {
        return new PathCommand("M", [[x, y]])
    }

    static LineTo(points: { x: number, y: number } | Array<{ x: number, y: number }>) {
        const input = Array.isArray(points) ? points : [points];
        return new PathCommand("L", [...
            input.map(point => {
                return [point.x, point.y] as [number, number]
            })])
    }
}