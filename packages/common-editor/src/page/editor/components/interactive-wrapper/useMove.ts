import { Ref, nextTick, onMounted, ref } from "vue";
type MoveStatus = "idle" | "selected" | "moving";
export function useMove(contentRef: Ref<HTMLElement>, hooks: {
    endMove: (x: number, y: number) => void
}) {
    const status = ref<MoveStatus>("idle");

    // 鼠标指针相对于浏览器可视区域的偏移
    let offsetX = 0;
    let offsetY = 0;
    const getSafeOffset = ({ movementX, movementY }: Pick<MouseEvent, "movementX" | "movementY">) => {
        offsetX += movementX;
        offsetY += movementY;
        return { offsetX, offsetY };
    }

    onMounted(() => {
        const { top, left } = contentRef.value.style;
        offsetX = Number.parseInt(left);
        offsetY = Number.parseInt(top);
    })
    function startMove() {
        status.value = "selected"
        const { top, left } = contentRef.value.style;
        offsetX = Number.parseInt(left);
        offsetY = Number.parseInt(top);
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", endMove);
    }

    function move(event: MouseEvent) {
        status.value = "moving"
        const { offsetX, offsetY } = getSafeOffset(event);
        contentRef.value!.style.top = offsetY + "px";
        contentRef.value!.style.left = offsetX + "px";
    }

    function endMove() {
        if (status.value == "moving") {
            hooks.endMove(offsetX, offsetY)
        }
        status.value = "idle";
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", endMove);
    }

    return {
        startMove,
        endMove,
        status
    }
}
