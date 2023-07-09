export interface updateStrategy {
    add: (a: any) => any
    update: (a: any) => any
}

export class FabricBase<T extends fabric.Object = fabric.Object> {
    width: number
    height: number
    instance?: T
    fill: string = "#3265FE"

    hasControls: boolean = true
    borderColor: string = "#3265FE"
    cornerColor: string = "#3265FE"
    cornelColor: string = "white"
    cornerStrokeColor: string = '#3265FE'
    cornerStyle: string = 'circle ' // 选中时，叫的属性。默认rect 矩形；circle 圆形
    // cornerSize: number = 20 // 选中时，角的大小为20
    // cornerDashArray: any = [10, 2, 6] // 选中时，虚线角的规则
    // statefullCache: boolean = true // 自动检测更新
    toSelective() {
        this.instance?.on("selected", () => {
            console.log("selected")
        })
    }

    constructor(width: number, height: number,) {
        this.width = width;
        this.height = height
    }
}