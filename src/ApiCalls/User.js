import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
console.log(BASE_URL)
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})
const authToken=sessionStorage.getItem('accessToken');
const config={
    headers:{
        'Authorization': `Bearer ${authToken}`
    }
}

export const checkUser=async()=>{
    console.log(config)
    var returnval;
    try {
        await axios.get("/user/checkuser",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error at check user')
            returnval=err;
        })
            

    } catch (error) {
        console.log('there seems a error')
    }
    return returnval;
}