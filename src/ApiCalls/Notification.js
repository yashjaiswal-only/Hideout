import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})


export const getNotificationsOfUser=async(token)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get("notification/getNotificationsOfUser",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in fetching notification',err)
            returnval=err;
        })
                
    } catch (error) {
        console.log('there seems a fetching notification')
        returnval={error};
    }
    return returnval;
}
