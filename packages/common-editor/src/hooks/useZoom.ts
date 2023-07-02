import { GlobalState, Runtime } from "@/page/editor/runtime";
import { useActorsStore } from "@/store/actors";
import { useGlobalStore } from "@/store/global";
import { onMounted, ref } from "vue";

enum KnobStatus {
    IDLE,
    MOVE
}
enum ButtonStatus {
    Down,
    Up
}

function useZoom(runtime: Runtime) {
    const status = ref<KnobStatus>(KnobStatus.IDLE);
    const actorStore = useActorsStore();
    const globalStore = useGlobalStore();
    const ctrlKeyStatus = ref<ButtonStatus>(ButtonStatus.Up);
    const startMove = () => {
        // idle 并且没有选中某个元素
        if (runtime.globalState.value == GlobalState.IDLE && ctrlKeyStatus.value == ButtonStatus.Down) {
            status.value = KnobStatus.MOVE;
            // runtime.globalStateChange('busy');
        }
    }
    const moveHandler = (e: MouseEvent) => {
        if (status.value == KnobStatus.IDLE) return;
        const moveX = e.movementX;
        const moveY = e.movementY;
        globalStore.canvas_style.top -= moveY;
        globalStore.canvas_style.left -= moveX;
        runtime.globalStateChange(GlobalState.DRAG)
    }

    const endMove = () => {
        status.value = KnobStatus.IDLE;
        runtime.globalStateChange(GlobalState.IDLE);
    }

    onMounted(() => {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key == 'Control') {
                ctrlKeyStatus.value = ButtonStatus.Down
            }
        })
        document.addEventListener('keyup', (e) => {
            const key = e.key;
            if (key == 'Control') {
                ctrlKeyStatus.value = ButtonStatus.Up
                endMove();
            }
        })
        document.addEventListener('mousedown', startMove);
        document.addEventListener('mouseup', endMove);
        document.addEventListener('mousemove', moveHandler);
    })
}

export default useZoom;