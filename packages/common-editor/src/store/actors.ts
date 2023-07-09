import { FabricBase } from "@/fabric-sdk/fabric-component/element";
import { BaseSetting, FillSetting, FontSetting, ShapeSetting, StrokeSetting, TextRenderMaterial } from "@/type/setting";
import { cloneDeep, get } from "lodash-es";
import { defineStore } from "pinia";
import { v1 } from "uuid";

type ActorOptions = {
    base: Partial<BaseSetting>
    font?: Partial<FontSetting>
    fill?: FillSetting
    stroke?: StrokeSetting
    shape?: ShapeSetting
};
type Actor = {
    id: string;
    tag: string;
    layer?: number;
    fabricElement?: FabricBase;
    options: ActorOptions & {
        material: TextRenderMaterial
    }
};


function set(target: Record<string, any>, paths: string[], value: any) {
    let current = target;
    console.log("Set:", target)
    if (paths.length == 1) {
        target[paths[0]] = value;
        return;
    }
    for (let i = 0; i < paths.length; i++) {
        const next = current[paths[i]];
        if (next == null) {
            console.warn("set 失败");
            return;
        } else if (i == paths.length - 2) {
            next[paths[paths.length - 1]] = value
            return
        } else {
            current = next;
        }
    }
}

enum ActionType {
    AddActor,
    DeleteActor,
    UpdateActor,
    BatchUpdateActor
}

type HistoryMap = {
    [ActionType.AddActor]: {
        id: string
    }
    [ActionType.DeleteActor]: {
        id: string,
        tag: string,
        options: any,
    }
    [ActionType.UpdateActor]: {
        id: string,
        paths: string[],
        oldValue: any
    }
    [ActionType.BatchUpdateActor]: {
        id: string,
        list: Array<{
            paths: string[],
            oldValue: any
        }>
    }
}

export const useActorsStore = defineStore("actors", {
    state: () => ({
        memoryStack: [] as any[],
        actors: [] as Array<Actor>,
        currentActorId: "",
    }),
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
        add(
            tag: string,
            options: {
                material: TextRenderMaterial;
                font: Partial<FontSetting>;
                base: Partial<BaseSetting>
            }
        ) {
            const id = v1();
            const layers = this.actors.map(item => item.layer || 1).sort((a, b) => a - b);
            // 确保 push 到尾部的图层是正确的
            const maxLayer = layers.length == 0 ? 1 : layers[0];
            this.actors.push({
                id,
                tag,
                options: cloneDeep(options),
                layer: maxLayer + 1
            });
            this.select(id)
            this.memory(ActionType.AddActor, {
                id
            })
        },
        copy(copyInstance: any | undefined, copyCount: number) {
            if (copyInstance == null) return;
            const content = cloneDeep(copyInstance);
            content.id = v1();
            content.options.base.top += copyCount * 10;
            content.options.base.left += copyCount * 10;

            // 选中新的
            this.actors.push(content);
            this.memory(ActionType.AddActor, {
                id: content.id
            })
            this.select(content.id);
        },
        select(id: string) {
            this.currentActorId = id;
        },
        updateOption(paths: string[], value: any) {
            const target = this.currentActor;
            const completePaths = ["options", ...paths]
            this.memory(ActionType.UpdateActor, {
                id: this.currentActorId,
                paths: completePaths,
                oldValue: get(target, completePaths)
            })
            set(target!, completePaths, value);
        },

        batchUpdateOption(jobs: Array<{ paths: string[], value: any }>) {
            const target = this.currentActor;
            const memoryHistory: {
                id: string,
                list: Array<{
                    paths: string[],
                    oldValue: any
                }>
            } = {
                id: target!.id,
                list: []
            };
            jobs.forEach(({ paths, value }) => {
                const completePaths = ["options", ...paths];
                memoryHistory.list.push({
                    paths: completePaths,
                    oldValue: get(target, completePaths)
                });
                set(target!, completePaths, value);
            })
            this.memory(ActionType.BatchUpdateActor, memoryHistory)
        },

        delete(id: string, skipMemory?: boolean) {
            const index = this.actors.findIndex(item => item.id == id);
            if (index == -1) return
            const instance = this.actors[index];
            if (!skipMemory) this.memory(ActionType.DeleteActor, instance)
            this.actors.splice(index, 1)
        },
        deleteCurrent() {
            if (this.currentActorId == "") return;
            this.delete(this.currentActorId);
        },

        // 存储下行为，和数据备份
        memory<T extends ActionType>(type: T, history: HistoryMap[T]) {
            this.memoryStack.push({
                type,
                history
            })
        },
        undo() {
            const memoryPack = this.memoryStack.pop();
            const { type, history } = memoryPack as { type: ActionType, history: any };
            const target = this.actors.find(item => item.id == history.id);

            switch (type) {
                case ActionType.DeleteActor:
                    this.actors.push(history);
                    break;
                case ActionType.UpdateActor:
                    if (target == null) break;
                    set(target, history.paths, history.oldValue);
                    break;
                case ActionType.AddActor:
                    this.delete(history.id, true);
                    break;
                case ActionType.BatchUpdateActor:
                    if (target == null) break;
                    const historyList = history.list;
                    historyList.forEach((item: any) => {
                        set(target, item.paths, item.oldValue);
                    });
                    break
            }
        },


        // 图层
        sortActor() {
            const copy = cloneDeep(this.actors);
            copy.sort((a, b) => a.layer! - b.layer!)
            this.actors = copy;
        },
        layerUp(componentId: string) {
            const targetIndex = this.actors.findIndex(item => item.id == componentId);
            const target = this.actors[targetIndex];
            const next = this.actors[targetIndex + 1];
            if (next == null) return;
            const additionLayer = next.layer! + 1;
            target.layer = additionLayer
            this.sortActor();
        },
        layerDown(componentId: string) {
            const targetIndex = this.actors.findIndex(item => item.id == componentId);
            const target = this.actors[targetIndex];
            const pre = this.actors[targetIndex - 1];
            if (pre == null) return;
            const additionLayer = pre.layer! - 1;
            target.layer = additionLayer
            this.sortActor();
        }
    },

    getters: {
        currentActor: (state) => {
            return state.actors.find((item) => item.id == state.currentActorId);
        },
    },
});
