import { Ref, onMounted, ref } from "vue";
type ResizeStatus = "idle" | "resizing";
type TupleToUnion<T extends any[]> = T extends Array<infer U> ? U : never

const resizeDot = ['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom'] as const;
export function useResize(contentRef: Ref<HTMLElement>, hooks: {
    endResize: (x: number, y: number, width: number, height: number) => void
}) {
    const status = ref<ResizeStatus>("idle");
    const currentRect = {
        height: 0,
        width: 0,
        left: 0,
        top: 0
    }
    let currentDirection = "";

    onMounted(() => {
        const { left, top, height, width } = contentRef.value.style;
        currentRect.left = Number.parseFloat(left);
        currentRect.top = Number.parseFloat(top);
        currentRect.height = Number.parseFloat(height);
        currentRect.width = Number.parseFloat(width);
    })

    function startResize() {
        const { left, top, height, width } = contentRef.value.style;
        currentRect.left = Number.parseFloat(left);
        currentRect.top = Number.parseFloat(top);
        currentRect.height = Number.parseFloat(height);
        currentRect.width = Number.parseFloat(width);

        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", endResize);
        status.value = "resizing"
    }

    function resize(event: MouseEvent) {
        const id = (event.target as any).id as TupleToUnion<['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom']>;
        if (resizeDot.includes(id)) {
            currentDirection = id
        }
        status.value = "resizing"
        // 1. 先拿到位移的距离，规定向左/向下是正方向
        const { movementX, movementY } = event

        switch (currentDirection) {
            case "right-bottom":
                currentRect.width += movementX
                currentRect.height += movementY
                break;
            case "right":
                currentRect.width += movementX
                break;
            case "right-top":
                currentRect.width += movementX
                currentRect.height += movementY
                currentRect.top += movementY
                break;
            case "bottom":
                currentRect.height += movementY
                break;
            case "left":
                currentRect.width += movementX;
                currentRect.left += movementX
                break;
            case "top":
                currentRect.height += movementY
                currentRect.top += movementY
                break;
            case "left-bottom":
                currentRect.left += movementX
                currentRect.width += movementX
                currentRect.height += movementY
                break;
            case "left-top":
                currentRect.width = movementX
                currentRect.height = movementY
                currentRect.top += movementY
                currentRect.left += movementX
                break;
        }

        contentRef.value!.style.width = currentRect.width + "px";
        contentRef.value!.style.height = currentRect.height + "px";
        contentRef.value!.style.top = currentRect!.top + "px"
        contentRef.value!.style.left = currentRect!.left + "px"

    }

    function endResize() {
        if (status.value !== "idle") {
            hooks.endResize(currentRect.left, currentRect.top, currentRect.width, currentRect.height)
        }
        status.value = "idle"
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", endResize);
    }

    return {
        startResize,
        endResize,
        status
    }
}