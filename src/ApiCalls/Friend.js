import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
const axiosInstance = axios.create({
//   withCredentials: true,
  baseURL: BASE_URL
})

export const searchInFindFriends=async(token,name)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get(`/friend/searchInFindFriends?name=${name}`,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log(err)
            returnval={error:'Error at search finding friends'};
        })
        
    } catch (err) {
        returnval={error:'Error at search finding friends'};
    }
    return returnval;
}
export const getAllFriends=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get(uid?`/friend/getAllFriends?uid=${uid}`:"/friend/getAllFriends",config)
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
export const getUserFriends=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
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
        await axiosInstance.get("/friend/acceptFriendReq?uid="+uid,config)
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
export const removeFriend=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.get("/friend/removeFriend?uid="+uid,config)
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
export const checkFriend=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    let returnval;
    try {
        await axiosInstance.get("/friend/checkFriend?id="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at checking friends'};
        })
        
    } catch (error) {
        returnval={error:'Error at checking friends'};
    }
    return returnval;
}
export const makeRequest=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get("/friend/makeFriendReq?uid="+uid,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval=err
        })
        
    } catch (error) {
        returnval={error:'Error at making requests'+error};
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
        await axiosInstance.get("/friend/makeFriendReq?uid="+uid,config)
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
        await axiosInstance.get("/friend/getAllReq",config)
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
export const getFriendsCount=async(token)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.get("/friend/countFriends",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval=err;
        })
        
    } catch (error) {
        returnval=error;
    }
    return returnval;
}
export const findFriends=async(token)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get("/friend/findfriends",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            returnval={error:'Error at finding  count'};
        })
        
    } catch (error) {
        returnval={error:'Error at finding friends'};
    }
    return returnval;
}

