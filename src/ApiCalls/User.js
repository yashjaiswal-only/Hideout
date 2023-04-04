import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
console.log(BASE_URL)
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})
// const authToken=sessionStorage.getItem('accessToken');


export const checkUser=async(token)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.get("/user/checkuser",config)
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

export const createUser=async(token)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.get("/user/create",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in creating account')
            returnval=err;
        })
            

    } catch (error) {
        console.log('there seems a error')
    }
    return returnval;
}