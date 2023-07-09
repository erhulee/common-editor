import { mapValues } from "lodash-es";
import { FabricBase, updateStrategy } from "./element";
import { fabric } from "fabric"
import { BaseSetting, FontSetting } from "@/type/setting";
export class FabricCircle extends FabricBase<fabric.Circle> {
    parent: fabric.Canvas
    instance: fabric.Circle
    private constructor(parent: fabric.Canvas, options: {
        width: number
        height: number
    }) {
        const { width, height } = options
        super(width, height)
        this.parent = parent
        const fabric_options = mapValues(Object.getOwnPropertyDescriptors(this), (value) => {
            return value.value
        })

        this.instance = new fabric.Circle({
            angle: 30, radius: 10
        })
        this.toSelective()
    }

    static create(parent: fabric.Canvas, options: {
        content: string,
        width: number
        height: number
    }) {
        const target = new FabricCircle(parent, options)
        const proxy = new Proxy(target, {
            set: function (target: FabricCircle, p: string | symbol, newValue: any, receiver: any) {
                if (p in target) {
                    target[p] = newValue;
                    target.instance.set(p, newValue);
                    parent.renderAll();
                    return true
                }
                return false
            }
        })
        target.parent.add(target.instance)
        return proxy;
    }

    static strategy: updateStrategy = {
        add(args: {
            base: BaseSetting,
            font: FontSetting,
            material: { content: string }
        }) {
            const { base, font, material } = args
            return {
                angle: 30, radius: 10
            }
        },
        update(args) {
            const [paths, value] = args
            const key = paths[paths.length - 1];
            switch (key) {
                case "fontWeight":
                case "fontSize":
                case "color":
                    return { fill: value }
                case "fontStyle":
                    return { [key]: value == "none" ? "normal" : value }
                case "textDecoration":
                    if (value == "underline") {
                        return {
                            underline: true,
                            linethrough: false
                        }
                    } else if (value == "line-through") {
                        return {
                            underline: false,
                            linethrough: true
                        }
                    } else {
                        return {
                            underline: false,
                            linethrough: false
                        }
                    }
            }
        }
    }
}
