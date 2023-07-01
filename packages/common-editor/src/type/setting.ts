export type FontSetting = {
    fontWeight: number,
    fontSize: number,
    fontFamily: string,
    textDecoration: "line-through" | "underline" | "none"
    fontStyle: "italic" | "none",
    textAlignLast: "left" | "right" | "center" | "justify"
    color: string
}

export type BaseSetting = {
    name: string,
    width: number,
    height: number,
    left: number,
    top: number,
    rotate: number,
    opacity: number
    isLocked: boolean
}

export type FillSetting = {
    color: string
}

export type StrokeSetting = {
    color: string
    width: number
}

export type ShapeSetting = {
    radius: number
}

// 渲染的内容
export type TextRenderMaterial = {
    content: string
}


