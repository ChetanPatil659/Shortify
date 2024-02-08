import { jwtDecode } from "jwt-decode"

const useAuth = ()=>{
    let accessToken = localStorage.getItem('accessToken')
    if(!accessToken) return false
    if(accessToken){
        let decode = jwtDecode(accessToken)
        if(decode.isLoggedIn) return decode
    }
    return false
}

export default useAuth

export const getAuthUser = () => {
    let accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return null;
    if (accessToken) {
      const decoded = jwtDecode(accessToken)
      console.log(decoded)
      if (decoded.isLoggedIn) return decoded;
    }
    return null;
  };