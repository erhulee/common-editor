import axios from "axios"

export function save(data: {
    projectId: string
    elementJSON: string
}) {
    return axios.post("/api/project/save", data)
}