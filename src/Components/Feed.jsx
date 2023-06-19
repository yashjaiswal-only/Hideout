import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Create from './Create'
import Post from './Post'
import {mobile} from '../responsive'
import { getAllPosts } from '../ApiCalls/Post'
import { endLoading, startLoading, updateFails } from '../Redux/UserRedux'
import { useDispatch, useSelector } from 'react-redux'

const Container=styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    ${mobile({
      width:'100%'
    })}
`

const Feed = ({handleOpen}) => {
  const [posts,setPosts]=useState([]);
  const token=useSelector(state=>state.token);
  const dispatch=useDispatch();
  const getAllPost=async()=>{
    dispatch(startLoading());
    var res=await getAllPosts(token);  //put await here to stop further execution untill you get response
    console.log(res)
    if(res.status===200){
      setPosts(res.data)
    }
    else if(res.status===404){
      dispatch(updateFails(true))
    }
    dispatch(endLoading());
  }
  useEffect(()=>{  
      getAllPost();
  },[])
  return (
    <Container>
      <Create handleOpen={handleOpen}/>
        {posts.map(p=>(<Post key={p._id} post={p} />))}
    </Container>  
  )
}

export default Feed;
