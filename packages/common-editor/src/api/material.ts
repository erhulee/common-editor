import axios from "axios";

export function getMaterial(): Promise<{
    count: number,
    data: Array<{
        id: number,
        address: string
    }>
}> {
    return axios.get("/material/image")
}