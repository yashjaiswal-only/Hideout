import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Topbar} from '../Components'
import Block from '../Components/Block';
import ChatBox from '../Components/ChatBox';
import Feed from '../Components/Feed';
import FriendsList from '../Components/FriendsList';
import FriendsRequest from '../Components/FriendsRequest';
import Right from '../Components/Right';
import Sidebar from '../Components/Sidebar';
import {mobile, tab} from '../responsive'
import HomeLoader from '../Components/HomePageLoader';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addAlert, removeUser } from '../Redux/UserRedux';
import { getApost, getMyPosts } from '../ApiCalls/Post';
import Post from '../Components/Post';
const Container=styled.div`
    width: 100%;
    /* overflow-y:hidden;
    ${tab({
      overflowY:'scroll'
    })} */
`
const Content=styled.div`
    width: 100%;
    position: relative;
    top:3rem;
    min-height: 100vh;
    background-color: #e1f2f7;
`
const Display=styled.div`
    width:55%;
    margin-left:20%;
    margin-right:25%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    ${mobile({
      width:'85%',
      marginLeft:'15%',
      justifyContent:'center'
    })}
`
const PostPage = ({handleOpen}) => {
  const [list,setList]=useState('');
  const [post,setPost]=useState(null);
  const token=useSelector(state=>state.token)
  const showList=(val)=>setList(val);
  const location=useLocation();
  const dispatch=useDispatch();

  useEffect(async()=>{
    var x=location.pathname.split('/');
    var userid=x[2],postid=x[3];
    console.log(userid+postid)
    const res=await getApost(token,postid,userid);
    console.log(res.response)
    if(res.status===200 ){
      console.log('hie')
      if(res.data.length){
        setPost(res.data);
      } 
      else{
        dispatch(addAlert('Post Unavailable'))
      } 
    }
    // else if(res.response.status===404) dispatch(updateFails(true));
  },[])
  return (<>
    <Container>
    <Topbar handleOpen={handleOpen}/>
    <Content>
         <Sidebar showList={showList}/>
         <Block list={list} showList={showList}/>
          <Right/>
        <Display>
          {post&&post!={}?<Post post={post}/>:""}
        </Display>
    </Content>
  </Container>
  </>
  )
}

export default PostPage;
