import { ShapeType } from "@/page/editor/layout/element-template";

export function isShape(tag: string | undefined) {
    return Object.values(ShapeType).find(item => item == tag) != null
}