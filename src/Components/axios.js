import axios from "axios"

const instance = axios.create({
    // URL of API(cloud Function)
    baseURL:'http://127.0.0.1:5001/clone-f5ccb/us-central1/api'
})

export default instance