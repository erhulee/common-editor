import axios from "axios"

export function save(data: {
    projectId: string
    elementJSON: string
    imgData: string
}) {
    const projectId = data.projectId;
    const actors = data.elementJSON;
    return axios.post("/api/project/save", {
        projectId,
        actors,
        fileData: data.imgData
    })
}