import { BaseSetting, FontSetting } from "@/type/font-setting";
import { cloneDeep } from "lodash-es";
import { defineStore } from "pinia";
import { v1 } from "uuid";
type Actor = {
    id: string;
    tag: string;
    options: Record<string, any> & {
        base: Partial<BaseSetting>
        font: Partial<FontSetting>
    };
};

type TextActor = {
    content: string;
} & Actor;


function set(target: Record<string, any>, paths: string[], value: any) {
    let current = target;

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
export const useActorsStore = defineStore("actors", {
    state: () => ({
        actors: [] as Array<TextActor>,
        currentActorId: "",
    }),
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
        add(
            tag: string,
            option: {
                content: string;
                options: {
                    font: Partial<FontSetting>;
                    base: Partial<BaseSetting>
                };
            }
        ) {
            const id = v1();
            const { content, options } = option;
            this.actors.push({
                id,
                tag,
                content: content,
                options: options,
            });
        },
        copy(copyInstance: any | undefined, copyCount: number) {
            if (copyInstance == null) return;

            const content = cloneDeep(copyInstance);
            content.id = v1();
            content.options.base.top += copyCount * 10;
            content.options.base.left += copyCount * 10;

            // 选中新的
            this.actors.push(content)
            this.select(content.id);
        },
        select(id: string) {
            this.currentActorId = id;
        },
        updateOption(paths: string[], value: any) {
            debugger
            const target = this.currentActor!.options;
            set(target, paths, value)
        },
        delete(id: string) {
            debugger
            const index = this.actors.findIndex(item => item.id == id);
            if (index == -1) return
            this.actors.splice(index, 1)
        },
        deleteCurrent() {
            if (this.currentActorId == "") return;
            this.delete(this.currentActorId)
        }
    },

    getters: {
        currentActor: (state) => {
            return state.actors.find((item) => item.id == state.currentActorId);
        },
    },
});
