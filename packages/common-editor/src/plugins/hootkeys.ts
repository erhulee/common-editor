import { useHotKeys } from "@/hooks/useHotKeys";
import { useActorsStore } from "@/store/actors";
import { cloneDeep } from "lodash-es";
let clipBoard: any = {};
let copyCount = 0;

function copyComponent(actorStore: any) {
    const currentCopy = cloneDeep(actorStore.currentActor);
    clipBoard = currentCopy
    copyCount = 0;
}

function pasteComponent(actorStore: any) {
    copyCount++;
    actorStore.copy(clipBoard, copyCount)
}

export default function initHotKey() {
    const actorStore = useActorsStore();
    useHotKeys("ctrl+c, command+c", () => copyComponent(actorStore));
    useHotKeys("ctrl+v, command+v", () => pasteComponent(actorStore));
    useHotKeys('backspace, delete', () => {
        actorStore.deleteCurrent()
    })

    useHotKeys("esc", () => {
        actorStore.select("")
    })

    useHotKeys("ctrl+z, command+z", () => {
        actorStore.undo()
    })

    return {
        copyComponent,
        pasteComponent
    }

}