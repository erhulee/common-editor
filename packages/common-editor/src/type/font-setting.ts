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
    isLocked: boolean
}

// 渲染的内容
export type TextRenderMaterial = {
    content: string
}