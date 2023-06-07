import axios from 'axios'
export default function initAxios() {
    axios.defaults.baseURL = 'http://localhost:8080/'
    axios.interceptors.request.use(
        (req) => {
            const token = localStorage.getItem("common-editor-token");
            req.headers.Authorization = token
            return req
        }, (req) => {
            return req
        })
    axios.interceptors.response.use(
        (res) => {
            return Promise.resolve(res.data)
        },
        (e) => {
            return Promise.reject(e)
        }
    )
}
