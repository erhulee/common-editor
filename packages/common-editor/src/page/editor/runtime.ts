import { useActorsStore } from "@/store/actors";
import { isShape } from "@/utils/isShape";
import EventEmitter from "eventemitter3";
import { Ref, ref } from "vue";

export enum GlobalEvents {
    SAVING_STATUS_CHANGE = "saving_status_change",
    ZOOM = "zoom",
    LOGIN_MODAL_SHOW = "login_modal_show",
    MATERIAL_MANAGER_SHOW = "material_manager_show"
}

export enum SettingRouter {
    SIZE = "size"
}


type GlobalState = "editing" | "saving"
let _state: GlobalState = "editing";


export class Runtime {
    eventsEmitter: EventEmitter
    globalState: Ref<GlobalState>
    actorStore: ReturnType<typeof useActorsStore>;
    private routerStack: Ref<string[]>

    constructor() {
        this.eventsEmitter = new EventEmitter();
        this.routerStack = ref([]);
        this.globalState = ref("editing")
        this.actorStore = useActorsStore();
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
        _state = state
        this.globalState.value = state
    }
    globalStateReset() {
        this.globalState.value = _state
    }
}