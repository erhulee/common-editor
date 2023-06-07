import { defineStore } from "pinia";
enum UserState {
    VISITOR,
    USER
}
export const useGlobalStore = defineStore("global", {
    state: () => ({
        canvas_style: {
            backgroundColor: "rgb(255,255,255)",
        },
        auth: ""
    }),

    actions: {
        updateCanvasOptions(key: string, value: any) {
            const target = this.canvas_style as any;
            target[key] = value
        },

        // 拿到token -> pinia 内部获取 userInfo 
        login(token: string) {
            this.auth = token
            localStorage.setItem("common-editor-token", token)
        }
    },

    getters: {
        userState() {
            if (this.auth) return UserState.USER
            else return UserState.VISITOR
        }
    },
});
