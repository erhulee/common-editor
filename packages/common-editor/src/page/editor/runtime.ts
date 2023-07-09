import { FabricController } from "@/fabric-sdk/fabric-controller";
import { useActorsStore } from "@/store/actors";
import { isShape } from "@/utils/isShape";
import EventEmitter from "eventemitter3";
import { Ref, ref } from "vue";

export enum GlobalEvents {
    SAVING_STATUS_CHANGE = "saving_status_change",
    ZOOM = "zoom",
    LOGIN_MODAL_SHOW = "login_modal_show",
    MATERIAL_MANAGER_SHOW = "material_manager_show",
    CONTEXT_MENU_SHOW = 'context_menu_show',
    CONTEXT_MENU_HIDE = 'context_menu_hide',
    LAYER_TREE_SHOW = "layer_tree_show",
    LAYER_TREE_HIDE = "layer_tree_hide",
    LAYER_TREE_TOGGLE = "layer_tree_hide"
}

export enum SettingRouter {
    SIZE = "size"
}


export enum GlobalState {
    BUSY,       // 元素在拖拉拽的时候
    SAVING,     // 主要解决在 HTML2Canvas 的时候，部分特殊 case
    IDLE,       // 空闲时态
    DRAG        // 用户按下 Ctrl 后，拖动画布
}

export class Runtime {
    eventsEmitter: EventEmitter
    globalState: Ref<GlobalState>
    actorStore: ReturnType<typeof useActorsStore>;
    fabricController: FabricController
    private preGlobalState: GlobalState = GlobalState.IDLE
    private routerStack: Ref<string[]>

    constructor() {
        this.eventsEmitter = new EventEmitter();
        this.routerStack = ref([]);
        this.globalState = ref(GlobalState.IDLE);
        this.actorStore = useActorsStore();
        this.fabricController = new FabricController();
    }

    get setting() {
        if (this.routerStack.value.length > 0) {
            return this.routerStack.value[this.routerStack.value.length - 1];
        } else {
            if (this.actorStore.currentActor?.tag == "text" || this.actorStore.currentActor?.tag == "image") {
                return this.actorStore.currentActor?.tag
            } else if (isShape(this.actorStore.currentActor?.tag)) {
                return "shape"
            } else {
                return ""
            }
        }
    }

    settingRouterPush(path: SettingRouter) {
        this.routerStack.value.push(path)
    }

    settingRouterBack() {
        this.routerStack.value.pop()
    }

    listen(eventName: GlobalEvents, callback: (...args: any[]) => void) {
        this.eventsEmitter.addListener(eventName, callback)
    }

    trigger(eventName: GlobalEvents, payload?: any) {
        this.eventsEmitter.emit(eventName, payload)
    }

    globalStateChange(state: GlobalState) {
        this.preGlobalState = state
        this.globalState.value = state
    }
    globalStateReset() {
        this.globalState.value = this.preGlobalState
    }
}