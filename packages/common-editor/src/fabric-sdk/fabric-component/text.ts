import { mapValues, omit } from "lodash-es";
import { FabricBase, updateStrategy } from "./element";
import { fabric } from "fabric"
import { BaseSetting, FontSetting } from "@/type/setting";
export class FabricText extends FabricBase<fabric.IText> {
    parent: fabric.Canvas
    text: string
    linethrough: boolean = true     // 删除线
    underline: boolean = true       // 下划线
    fontFamily: string              // 字体
    fontSize: number
    fontWeight: string | number
    fontStyle: 'italic' | 'normal'
    instance: fabric.IText
    private constructor(parent: fabric.Canvas, content: string, options: {
        width: number
        height: number
        text: string
        linethrough?: boolean           // 删除线
        underline?: boolean  // 下划线
        fontFamily?: string
        fontSize?: number
        fontWeight?: string | number
        fontStyle?: 'italic' | 'normal'
    }) {
        const { width, height } = options
        super(width, height)
        const { linethrough = true,
            underline = true,
            fontFamily = 'Comic Sans',
            fontSize = 20,
            fontWeight = "normal",
            fontStyle = "normal"
        } = options
        this.parent = parent
        this.linethrough = linethrough
        this.underline = underline
        this.fontFamily = fontFamily
        this.fontSize = fontSize
        this.fontWeight = fontWeight
        this.fontStyle = fontStyle
        this.text = content;

        const fabric_options = omit(mapValues(Object.getOwnPropertyDescriptors(this), (value) => {
            return value.value
        }), ["height", "width", "parent", "instance"])


        this.instance = new fabric.IText(content, fabric_options)
        this.toSelective()
    }

    static create(parent: fabric.Canvas, options: {
        content: string,
        width: number
        height: number
        linethrough?: boolean           // 删除线
        underline?: boolean  // 下划线
        fontFamily?: string
        fontSize?: number
        fontWeight?: string | number
        fontStyle?: 'italic' | 'normal'
    }) {
        const target = new FabricText(parent, options.content, options)
        const proxy = new Proxy(target, {
            set: function (target: FabricText, p: string | symbol, newValue: any, receiver: any) {
                console.log("set: ", p)
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
                content: material.content,
                linethrough: font.textDecoration == "line-through",          // 删除线
                underline: font.textDecoration == "underline",
                // fontFamil?: string
                fontSize: font.fontSize,
                fontWeight: font.fontWeight,
                fontStyle: font.fontStyle
            }
        },
        update(args) {
            const [paths, value] = args
            const key = paths[paths.length - 1];
            switch (key) {
                case "fontWeight":
                case "fontSize":
                    return { [key]: value }
                case "color":
                    return { fill: value }
                case "content":
                    return { text: value }
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
