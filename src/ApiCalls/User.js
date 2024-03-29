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
            console.log(err)
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

export const updateUser=async(token,data)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
        // data:data
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.put("/user/update",data,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in updating account',err)
            returnval={error:'Error at creating profile'};
        })
                
    } catch (error) {
        console.log('there seems a error')
        returnval={error:'Error at creating profile'};
    }
    return returnval;
}

export const getUserDetails=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    // console.log(config)
    let returnval;
    try {
        await axiosInstance.get(uid?`/user/getUserDetails?uid=${uid}`:"/user/getUserDetails",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in fetching account'+err)
            returnval=err;
        })
        
    } catch (error) {
        console.log('error in fetching account')
        console.log(error)
    }
    return returnval;
}
export const getUserMinDetails=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get(uid?`/user/getMiniDetails?uid=${uid}`:"/user/getUserDetails",config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in fetching mini details '+err)
            returnval=err;
        })
        
    } catch (error) {
        console.log('error in fetching mini details')
        console.log(error)
    }
    return returnval;
}
export const searchUser=async(token,name)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get(`/user/searchUser?name=${name}`,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in searching user '+err)
            returnval=err;
        })
        
    } catch (error) {
        console.log('error in searching user')
        console.log(error)
    }
    return returnval;
}

