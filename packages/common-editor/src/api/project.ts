import axios from "axios"

export function save(data: {
    projectId: string
    elementJSON: string
}) {
    const projectId = data.projectId;
    const actors = data.elementJSON;
    return axios.post("/api/project/save", {
        projectId,
        actors
    })
}