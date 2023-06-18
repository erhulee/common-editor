import { getInfo } from "@/api/user";
import { defineStore } from "pinia";
enum UserState {
    VISITOR,
    USER
}
export const useGlobalStore = defineStore("global", {
    state: () => ({
        canvas_style: {
            width: 600,
            height: 1000,
            backgroundColor: "rgb(255,255,255)"
        },
        auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjE0fQ.Icvjm074v6zkgfzT5C_qGqlqBNRw3R4O0sILMVptn5c",
        userInfo: {
            name: "我是设计师",
            uid: "9023088745581528099",
            avatar: ""
        }
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
