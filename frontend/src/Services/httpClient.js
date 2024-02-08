import axios from "axios";

let accessToken = localStorage.getItem('accessToken')

export default axios.create({
    baseURL: 'https://shortifiyurlshortner.netlify.app/api/',
    headers:{
        authorization: `Berarer ${accessToken}`
    }
})