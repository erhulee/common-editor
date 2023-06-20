import { BaseSetting, FillSetting, ShapeSetting, StrokeSetting } from "@/type/setting"
import { Round, Rectangle, Triangle, DiamondThree, H1, H2, Text } from "@icon-park/vue-next"
import { Icon } from "@icon-park/vue-next/lib/runtime"
type ShapeOption = {
    base: BaseSetting,
    shape: ShapeSetting,
    fill: FillSetting,
    stroke: StrokeSetting
}

export enum ShapeType {
    Circle = "circle",
    Rectangle = "rectangle",
    Triangle = "triangle",
    Diamond = "diamond"
}

export const shape_template: Array<{
    tag: ShapeType,
    name: string,
    icon: Icon,
    default_options: ShapeOption
}> = [
        {
            tag: ShapeType.Circle,
            name: "圆形",
            icon: Round,
            default_options: {
                base: {
                    width: 100,
                    height: 100,
                    top: 100,
                    left: 100,
                    rotate: 0,
                    isLocked: false,
                    opacity: 1
                },
                shape: {
                    radius: 2
                },
                fill: {
                    color: "rgb(0,0,0)"
                },
                stroke: {
                    color: "rgb(0,0,0)",
                    width: 1
                }
            }
        },
        {
            tag: ShapeType.Rectangle,
            name: "矩形",
            icon: Rectangle,
            default_options: {
                base: {
                    width: 100,
                    height: 100,
                    top: 100,
                    left: 100,
                    rotate: 0,
                    isLocked: false,
                    opacity: 1
                },
                shape: {
                    radius: 2
                },
                fill: {
                    color: "rgb(0,0,0)"
                },
                stroke: {
                    color: "rgb(0,0,0)",
                    width: 1
                }
            }
        },
        {
            tag: ShapeType.Triangle,
            name: "三角形",
            icon: Triangle,
            default_options: {
                base: {
                    width: 100,
                    height: 100,
                    top: 100,
                    left: 100,
                    rotate: 0,
                    isLocked: false,
                    opacity: 1
                },
                shape: {
                    radius: 2
                },
                fill: {
                    color: "rgb(0,0,0)"
                },
                stroke: {
                    color: "rgb(0,0,0)",
                    width: 1
                }
            }
        },
        {
            tag: ShapeType.Diamond,
            name: "菱形",
            icon: DiamondThree,
            default_options: {
                base: {
                    width: 100,
                    height: 100,
                    top: 100,
                    left: 100,
                    rotate: 0,
                    isLocked: false,
                    opacity: 1
                },
                shape: {
                    radius: 2
                },
                fill: {
                    color: "rgb(0,0,0)"
                },
                stroke: {
                    color: "rgb(0,0,0)",
                    width: 1
                }
            }
        },
    ]


export const text_template = [
    {
        name: "标题",
        icon: H1,
        default_options: {
            content: "双击编辑标题",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 600,
                fontSize: 90,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                width: 500,
                height: 80,
                rotate: 0,
                opacity: 1,
                isLocked: false
            }
        }
    },
    {
        name: "副标题",
        icon: H2,
        default_options: {
            content: "双击编辑副标题",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 400,
                fontSize: 70,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                width: 200,
                height: 200,
                rotate: 0,
                opacity: 1,
                isLocked: false
            }
        }
    },
    {
        name: "正文",
        icon: Text,
        default_options: {
            content: "双击编辑正文",
            font: {
                color: "rgb(0,0,0)",
                fontWeight: 400,
                fontSize: 40,
                textAlignLast: "center"
            },
            base: {
                top: 100,
                left: 100,
                width: 250,
                height: 55,
                rotate: 0,
                opacity: 1,
                isLocked: false
            }
        }
    }
]
