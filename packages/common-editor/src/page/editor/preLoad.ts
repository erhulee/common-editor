import initHotKey from "@/plugins/hootkeys";
import { GlobalEvents, Runtime } from "./runtime";
import { Ref, reactive, ref } from "vue";
import { useActorsStore } from "@/store/actors";
import { useClickOutside } from "@/hooks/useClickOutside";

export enum ActorType {
    Canvas,
    Actor
}
export type ContextMenuActionPayload = {
    type: ActorType
    componentId: string
}
// 汇集一些初始化内容，后期可以在这里实现加载动画
export function preLoad(runtime: Runtime, contextMenuRef: Ref<HTMLElement | null>) {
    const actorStore = useActorsStore()
    // 快捷键
    const callbacks = initHotKey();

    // html2canvas 
    runtime.listen(GlobalEvents.SAVING_STATUS_CHANGE, (status: "idle" | "saving") => {
        runtime.globalStateChange(status)
    })

    // 右键菜单
    const contextMenu = reactive({
        display: false,
        actorType: ActorType.Actor,
        currentId: ""
    })
    runtime.listen(GlobalEvents.CONTEXT_MENU_SHOW, (payload: {
        event: PointerEvent,
        info: ContextMenuActionPayload
    }) => {
        const { event, info } = payload
        event.preventDefault();
        const positionX = event.clientX;
        const positionY = event.clientY;
        contextMenuRef.value!.style.top = positionY + "px";
        contextMenuRef.value!.style.left = positionX + "px";
        contextMenuRef.value?.focus();
        contextMenu.display = true;
        contextMenu.actorType = info.type;
        contextMenu.currentId = info.componentId;
        if (info.type == ActorType.Actor) {
            actorStore.select(info.componentId)
        }
    })

    runtime.listen(GlobalEvents.CONTEXT_MENU_HIDE, () => {
        contextMenu.display = false
    })

    useClickOutside(contextMenuRef as any, () =>
        runtime.trigger(GlobalEvents.CONTEXT_MENU_HIDE, {})
    )

    return {
        hotkeyCallback: callbacks,
        contextMenu
    }
}