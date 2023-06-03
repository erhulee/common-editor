import { Ref, nextTick, ref } from "vue";
type MoveStatus = "idle" | "selected" | "moving";
export function useMove(contentRef: Ref<HTMLElement>, hooks: {
    endMove: (x: number, y: number) => void
}) {
    const status = ref<MoveStatus>("idle");
    const canvas = document.getElementById("editor-canvas");
    const canvasRect = canvas!.getBoundingClientRect();
    // 点击位置到元素边缘的距离
    const diff = {
        left: 0,
        top: 0
    }

    // move 过程中临时变量
    const currentPosition = {
        left: 0,
        top: 0
    }
    function startMove(event: MouseEvent) {
        // 点击位置
        const clickPoint = {
            x: event.clientX,
            y: event.clientY,
        };
        const elementRect = contentRef.value!.getBoundingClientRect();
        diff.left = clickPoint.x - elementRect.left;
        diff.top = clickPoint.y - elementRect.top;
        currentPosition.left = elementRect.left - canvasRect!.left;
        currentPosition.top = elementRect.top - canvasRect!.top;
        status.value = "selected"
        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", endMove);

        console.log("监听 move")
    }

    function move(event: MouseEvent) {
        status.value = "moving"
        const currentLeft = event.clientX;
        const currentTop = event.clientY;
        const elementRect = contentRef.value!.getBoundingClientRect();
        const moveX = currentLeft - diff.left - elementRect.left;
        const moveY = currentTop - diff.top - elementRect.top;

        currentPosition.left = currentPosition!.left + moveX;
        currentPosition.top = currentPosition!.top + moveY;

        contentRef.value!.style.top = currentPosition!.top + "px";
        contentRef.value!.style.left = currentPosition!.left + "px";
    }

    function endMove() {
        console.log("endMove")

        if (status.value == "moving") {
            hooks.endMove(currentPosition?.left, currentPosition?.top)
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
