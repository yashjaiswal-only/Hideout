import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
console.log(BASE_URL)
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})


export const getAllFriends=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    console.log(config)
    let returnval;
    try {
        await axiosInstance.get("/friend/getAllFriends?uid="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log(err)
            returnval={error:'Error at finding friends'};
        })
        
    } catch (err) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}
export const acceptRequest=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/friend/acceptFriendReq?uid="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at finding friends'};
        })
        
    } catch (error) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}
export const makeRequest=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/friend/makeFriendReq?uid="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at finding friends'};
        })
        
    } catch (error) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}
export const deleteRequest=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/friend/makeFriendReq?uid="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at finding friends'};
        })
        
    } catch (error) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}
export const rejectRequest=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/friend/rejectFriendReq?uid="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at finding friends'};
        })
        
    } catch (error) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}
export const getAllRequest=async(token)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/friend/getAllReq",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at finding friends'};
        })
        
    } catch (error) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}
