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