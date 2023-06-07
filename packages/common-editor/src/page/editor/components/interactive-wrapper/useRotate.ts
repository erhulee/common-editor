import { Ref, ref } from "vue";
type RotateStatus = "idle" | "rotate";
export function getDeg(rotate: string) {
    const rotateRegex = /rotate\((-?\d+.?\d*)(deg)?\)/;
    const match = rotate.match(rotateRegex);
    if (match && match[1]) {
        return Number(match[1]); // 输出 -42.6541  
    } else {
        console.log("无法匹配到符合条件的字符串");
        return 0;
    }
}
export function useRotate(contentRef: Ref<HTMLElement>, hooks: {
    endRotate: (deg: number) => void
}) {
    const status = ref<RotateStatus>("idle");
    // 老的 deg
    let deg = 0;
    let result = 0;
    const currentRect = {
        height: 0,
        width: 0,
        left: 0,
        top: 0
    }

    // 起点
    const startPoint = {
        x: 0,
        y: 0
    }

    // 终点
    const endPoint = {
        x: 0,
        y: 0
    }
    function startRotate(event: MouseEvent) {
        deg = getDeg(contentRef.value.style?.transform);
        const { left, top, height, width } = contentRef.value.style;
        currentRect.left = Number.parseFloat(left);
        currentRect.top = Number.parseFloat(top);
        currentRect.height = Number.parseFloat(height);
        currentRect.width = Number.parseFloat(width);

        // 画布坐标转换
        const canvas = document.getElementById("editor-canvas");
        const { top: canvasTop, left: canvasLeft } = canvas!.getBoundingClientRect()

        console.log(event.offsetX, event.clientX)
        console.log(canvasLeft, canvasTop)
        console.log(canvas?.offsetLeft, canvas?.offsetTop)
        console.log(canvas?.clientLeft, canvas?.clientTop)

        endPoint.x = startPoint.x = currentRect.left + event.clientX - canvasLeft;
        endPoint.y = startPoint.y = currentRect.top + event.clientY - canvasTop;

        document.addEventListener("mousemove", rotate);
        document.addEventListener("mouseup", endRotate);
        status.value = "rotate"

        console.log()

    }

    function rotate(event: MouseEvent) {
        status.value = "rotate"
        const center = {
            x: currentRect.left + currentRect.width / 2,
            y: currentRect.top + currentRect.height / 2
        }

        endPoint.x += event.movementX;
        endPoint.y += event.movementY;

        const vector_a = [center.x - startPoint.x, center.y - startPoint.y];
        const vector_b = [center.x - endPoint.x, center.y - endPoint.y];

        // console.log(vector_a, vector_b)
        const len_a = Math.sqrt(Math.pow(vector_a[0], 2) + Math.pow(vector_a[1], 2));
        const len_b = Math.sqrt(Math.pow(vector_b[0], 2) + Math.pow(vector_b[1], 2));
        const dot_ab = (vector_a[0] * vector_b[0] + vector_a[1] * vector_b[1])
        const cos = dot_ab / (len_a * len_b);
        const radians = Math.acos(cos);
        let degrees = radians * (180 / Math.PI);

        // 判断旋转方向，使用叉积（外积）判断向量叉积的方向
        const cross_ab = vector_a[0] * vector_b[1] - vector_a[1] * vector_b[0];
        if (cross_ab < 0) {
            degrees = -degrees;
        }
        result = deg + degrees;
        contentRef.value!.style.transform = `rotate(${deg + degrees}deg`
    }

    function endRotate() {
        if (status.value !== "idle") {
            hooks.endRotate(result);
        }
        status.value = "idle"
        document.removeEventListener("mousemove", rotate);
        document.removeEventListener("mouseup", endRotate);
    }

    return {
        startRotate,
        endRotate,
        status
    }
}