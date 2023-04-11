import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
console.log(BASE_URL)
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})


export const makePost=async(token,data)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/post/makepost",data,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in creating post',err)
            returnval=err;
        })
                
    } catch (error) {
        console.log('there seems a error')
        returnval={error};
    }
    return returnval;
}