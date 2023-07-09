import { Runtime } from '@/page/editor/runtime';
import { fabric } from 'fabric' // 引入 fabric
import { inject, onMounted, ref } from 'vue'
import { FabricController } from './fabric-controller';

function useFabric(id: string, option?: {
    width: number
    height: number,
    backgroundColor: "#eee"
}): FabricController {
    const fabricCanvasRef = ref<null | fabric.Canvas>(null);
    const runtime = inject("runtime") as Runtime;
    function init() {
        const canvas = new fabric.Canvas(id, {
            backgroundColor: "#fff",
            // selection: false, // 不可框选
        })
        fabricCanvasRef.value = canvas
        runtime.fabricController.init(fabricCanvasRef as any)

    }

    // function initCorner() {
    //     // 修改控制点的形状，默认为`rect`矩形，可选的值还有`circle`圆形
    //     fabric.Object.prototype.cornerStyle = "circle";
    //     // 修改控制点的填充色为白色
    //     fabric.Object.prototype.cornerColor = "white";
    //     // 修改控制点的大小为10px
    //     fabric.Object.prototype.cornerSize = 10;
    //     // 设置控制点不透明，即可以盖住其下的控制线
    //     fabric.Object.prototype.transparentCorners = false;
    //     // 修改控制点的边框颜色为`gray`灰色
    //     fabric.Object.prototype.cornerStrokeColor = "gray";

    //     // 单独修改旋转控制点距离主体的纵向距离为-20px
    //     fabric.Object.prototype.controls.mtr.offsetY = -20;
    //     // 单独修改旋转控制点，光标移动到该点上时的样式为`pointer`，一个手的形状
    //     fabric.Object.prototype.controls.mtr.cursorStyle = "pointer";
    // }

    onMounted(() => {
        init();
        // initCorner();
    })

    return runtime.fabricController
}

export default useFabric