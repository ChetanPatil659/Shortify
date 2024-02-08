import httpClient from "./httpClient";

import getAuthUser from "../util/useAuth";
import useAuth from "../util/useAuth";

export const getUrlForUser = async()=>{
    const userId = useAuth().id
    try {
        const { data } = await httpClient.get(`url/user/${userId}`)
        return data
    } catch (error) {
        console.log(error, 'from urlservices get url');
    }
}

export const deleteUrlByUrlCode = async(urlCode)=>{
    try {
        const { data } = await httpClient.delete(`url/${urlCode}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateUrlByUrlCode = async(data) => {
    try {
        const { updatedData } = await httpClient.put(`url/${data.urlCode}`, data)
        return updatedData
    } catch (error) {
        console.log(error)
    }
}