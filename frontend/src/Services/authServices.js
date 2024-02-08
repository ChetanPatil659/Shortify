import httpClient from "./httpClient";

export const signup = async(payload, navigate)=>{
    console.log(payload)
    try {
        const {data} = await httpClient.post('user', payload)
        storeAccessTokenLocal(data.accessToken)
        navigate('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

export const login = async(payload, navigate)=>{
    try {
        const {data} = await httpClient.post('user/login', payload)
        storeAccessTokenLocal(data.accessToken)
        navigate('/dashboard')
    } catch (error) {
        console.log(error)
    }
}

const storeAccessTokenLocal = (accessToken) => localStorage.setItem('accessToken', accessToken)

export const logout = (navigate)=> {
    localStorage.removeItem('accessToken')
    navigate('/login')
}