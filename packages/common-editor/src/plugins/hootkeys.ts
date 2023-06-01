import { useHotKeys } from "@/hooks/useHotKeys";
import { useActorsStore } from "@/store/actors";
import { cloneDeep } from "lodash-es";

export default function initHotKey() {
    const actorStore = useActorsStore();
    let clipBoard: any = {};
    let copyCount = 0;
    useHotKeys("ctrl+c, command+c", () => {
        const currentCopy = cloneDeep(actorStore.currentActor);
        clipBoard = currentCopy
        copyCount = 0;
    });
    useHotKeys("ctrl+v, command+v", () => {
        copyCount++;
        actorStore.copy(clipBoard, copyCount)
    });

    useHotKeys('backspace, delete', () => {
        actorStore.deleteCurrent()
    })

    useHotKeys("esc", () => {
        actorStore.select("")
    })

    useHotKeys("ctrl+z, command+z", () => {
        console.log("hee")
        actorStore.undo()
    })
}