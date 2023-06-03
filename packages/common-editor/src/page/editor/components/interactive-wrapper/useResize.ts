import { Ref, ref } from "vue";
type ResizeStatus = "idle" | "resizing";
type TupleToUnion<T extends any[]> = T extends Array<infer U> ? U : never

const resizeDot = ['left-top', 'left-bottom', 'left', 'top', 'bottom', 'right', 'right-top', 'right-bottom'] as const;
export function useResize(contentRef: Ref<HTMLElement>, hooks: {
    endResize: (x: number, y: number, width: number, height: number) => void
}) {
    const status = ref<ResizeStatus>("idle");
    const clickDiff = {
        left: 0,
        top: 0
    }
    const currentSize = {
        height: 0,
        width: 0
    }
    const currentPosition = {
        left: 0,
        top: 0
    }
    const canvas = document.getElementById("editor-canvas");
    const canvasRect = canvas!.getBoundingClientRect();
    let elementRect: null | DOMRect = null;
    let currentDirection = "";
    function startResize(event: MouseEvent) {
        // endMove();
        elementRect = contentRef.value!.getBoundingClientRect();
        // 点击位置
        const point = {
            x: event.x,
            y: event.y
        };

        clickDiff.left = point.x - elementRect.left;
        clickDiff.top = point.y - elementRect.top;

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
        const currentLeft = event.clientX;
        const currentTop = event.clientY;

        const moveX = currentLeft - clickDiff.left - elementRect!.left;
        const moveY = currentTop - clickDiff.top - elementRect!.top;

        currentSize.height = elementRect!.height;
        currentSize.width = elementRect!.width;
        currentPosition.left = elementRect!.left - canvasRect!.left;
        currentPosition.top = elementRect!.top - canvasRect!.top

        switch (currentDirection) {
            case "right-bottom":
                currentSize.width = elementRect!.width + moveX
                currentSize.height = elementRect!.height + moveY
                break;
            case "right":
                currentSize.width = elementRect!.width + moveX
                break;
            case "right-top":
                currentSize.width = elementRect!.width + moveX
                currentSize.height = elementRect!.height - moveY
                currentPosition!.top += moveY
                break;
            case "bottom":
                currentSize.height = elementRect!.height + moveY
                break;
            case "left":
                currentSize.width = elementRect!.width - moveX;
                currentPosition!.left += moveX
                break;
            case "top":
                currentSize.height = elementRect!.height - moveY
                currentPosition!.top += moveY
                break;
            case "left-bottom":
                currentPosition!.left += moveX
                currentSize.width = elementRect!.width - moveX
                currentSize.height = elementRect!.height + moveY
                break;
            case "left-top":
                currentSize.width = elementRect!.width - moveX
                currentSize.height = elementRect!.height - moveY
                currentPosition!.top += moveY
                currentPosition!.left += moveX
                break;
        }

        console.log(currentSize, moveX)
        contentRef.value!.style.width = currentSize.width + "px";
        contentRef.value!.style.height = currentSize.height + "px";
        contentRef.value!.style.top = currentPosition!.top + "px"
        contentRef.value!.style.left = currentPosition!.left + "px"

    }

    function endResize() {
        hooks.endResize(currentPosition.left, currentPosition.top, currentSize.width, currentSize.height)
        status.value = "idle"
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", endResize);
        // actorStore.updateOption(["base", "top"], currentPosition?.top);
        // actorStore.updateOption(["base", "left"], currentPosition?.left)
        // actorStore.updateOption(["base", "width"], currentSize.width);
        // actorStore.updateOption(["base", "height"], currentSize.height)
    }

    return {
        startResize,
        endResize,
        status
    }


}