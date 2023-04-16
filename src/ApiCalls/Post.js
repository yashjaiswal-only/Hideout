import axios from "axios";

const BASE_URL=import.meta.env.VITE_API;
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
    let returnval;
    try {
        await axiosInstance.post("/post/makepost",data,config)
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
export const deletePost=async(token,postId)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get("/post/deletePost?postId="+postId,config)
        .then(res=>{
            returnval=res;
        })
        .catch(err=>{
            console.log('error in deleing post',err)
            returnval=err;
        })
                
    } catch (error) {
        console.log('there seems a error')
        returnval={error};
    }
    return returnval;
}

export const getMyPosts=async(token,uid)=>{
    const config={
        headers:{
            'Authorization': `Bearer ${token}`
        },
    }
    let returnval;
    try {
        await axiosInstance.get(uid?`/post/userpost?uid=${uid}`:"/post/userpost",config)
        .then(res=>{
            returnval=res; 
        })
        .catch(err=>{
            console.log('error in fetching  post',err)
            returnval=err;
        })
        
    } catch (error) {
        console.log('error in fetching my post',error)
        returnval={error};
    }
    return returnval;
}

export const getAllPosts=async(token)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get('/post/allPosts',config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in getting all posts',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in getting all posts',error)
        returnval=error;
    }
    return returnval;
}
export const addLike=async(token,postId,userId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/addlike?id=${userId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in  liking',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in liking',error)
        returnval=error;
    }
    return returnval;
}
export const removeLike=async(token,postId,userId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/unlike?id=${userId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in  unliking',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in unliking',error)
        returnval=error;
    }
    return returnval;
}
export const countLike=async(token,postId,userId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/countlikes?id=${userId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in counting likes',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in counting likes',error)
        returnval=error;
    }
    return returnval;
}
export const checkLike=async(token,postId,userId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/checkLike?id=${userId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in counting likes',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in counting likes',error)
        returnval=error;
    }
    return returnval;
}

export const countComment=async(token,postId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/countComment?postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in counting comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in counting comment',error)
        returnval=error;
    }
    return returnval;
}
export const addComment=async(token,postUID,postId,data)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.post(`/post/addComment?postId=${postId}&id=${postUID}`,data,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in adding comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in adding comment',error)
        returnval=error;
    }
    return returnval;
}

export const getAllCommentsOfPost=async(token,postId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    console.log(postId)
    let returnval;
    try {
        await axiosInstance.get(`/post/getCommentsOfPost?postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in fetching comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in fetching comment',error)
        returnval=error;
    }
    return returnval;
}
export const addReply=async(token,postId,commentId,posterId,commenterId,data)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.post(`/post/addReply?postId=${postId}&commentId=${commentId}&id=${posterId}&commenterId=${commenterId}`,data,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in add reply',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in add reply',error)
        returnval=error;
    }
    return returnval;
}

export const getRepliesOfComment=async(token,postId,commentId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/getRepliesOfComment?commentId=${commentId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in fetching replies',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in fetching replies',error)
        returnval=error;
    }
    return returnval;
}
export const checkLikeInComment=async(token,postId,commentId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/checkLikeOfComment?commentId=${commentId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in counting likes',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in counting likes',error)
        returnval=error;
    }
    return returnval;
}

export const addLikeInComment=async(token,postId,commentId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/addLikeToComment?commentId=${commentId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in liking comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in liking comment',error)
        returnval=error;
    }
    return returnval;
}

export const deleteLikeInComment=async(token,postId,commentId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/deleteLikeFromComment?commentId=${commentId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in disliking comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in disliking comment',error)
        returnval=error;
    }
    return returnval;
}
export const countLikeInComment=async(token,postId,commentId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/countLikesOfComment?commentId=${commentId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in counting like in comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in counting like in comment',error)
        returnval=error;
    }
    return returnval;
}
export const deleteComment=async(token,postId,commentId)=>{
    const config={
        headers:{
            'Authorization':`Bearer ${token}`
        }
    }
    let returnval;
    try {
        await axiosInstance.get(`/post/deleteComment?commentId=${commentId}&postId=${postId}`,config)
        .then((res)=>{
            returnval=res;
        })
        .catch((err)=>{
            console.log('error in deleting comment',err)
            returnval=err;
        })
    } catch (error) {
        console.log('error in deleting comment',error)
        returnval=error;
    }
    return returnval;
}