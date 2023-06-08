import axios from "axios";

type UserInfo = {
    name: string
    avatar: string
    email: string
}

export function register(username: string, password: string, password_confirm: string) {
    return axios.post("/api/auth/register", {
        username,
        password,
        password_confirm
    })
}

export function login(username: string, password: string) {
    return axios.post("/api/auth/login", {
        username,
        password,
    })
}

export function updateInfo(data: Partial<UserInfo>) {
    return axios.put("/api/user/info", data)
}

export function getInfo() {
    return axios.get("/api/user/info")
}