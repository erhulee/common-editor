import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
    state: () => ({
        canvas_style: {
            backgroundColor: "rgb(255,255,255)",
        }
    }),

    actions: {
        updateCanvasOptions(key: string, value: any) {
            const target = this.canvas_style as any;
            target[key] = value
        }
    },

    getters: {

    },
});
