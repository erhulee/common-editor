export type FontSetting = {
    fontWeight: number,
    fontSize: number,
    textDecoration: "line-through" | "underline" | "none"
    fontStyle: "italic" | "none",
    textAlign: "end" | "start" | "center" | "both"
}

export type BaseSetting = {
    isLocked: boolean
}

// 渲染的内容
export type TextRenderMaterial = {
    content: string
}