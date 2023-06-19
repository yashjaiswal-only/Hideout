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
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../Redux/UserRedux';
import { getMyPosts } from '../ApiCalls/Post';
import Post from '../Components/Post';
import { Modal } from '@mui/material';
import CreatePost from '../Components/CreatePost';
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
const Chats=styled.div`
  background-color: black;
`
const MyPost = () => {
  const [list,setList]=useState('');
  const [postList,setPostList]=useState([]);
  const token=useSelector(state=>state.token)
  const showList=(val)=>setList(val);
  const chatUserList=useSelector(state=>state.chatUsers);


  //404 error 
  const [fails,setFails]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    if(fails){
      console.log('navigating')
      setTimeout(()=>{
        dispatch(removeUser());
        navigate('/')
      },3000)
    }
  },[fails])

  //get all my post
  const getPosts=async()=>{
    const res=await getMyPosts(token);
    console.log(res)
    if(res.status===200){   
        setPostList(res.data)
    }
  }
  useEffect(()=>{
    getPosts();
  },[])

  //create post
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
  }
  return (<>
    <Container>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <CreatePost handleClose={handleClose}/>
      </Modal>
    <Topbar handleOpen={handleOpen}/>
    <Content>
         <Sidebar showList={showList}/>
         <Block list={list} showList={showList}/>
          <Right/>
          <Chats>
              {chatUserList.map((chat,index)=>(
              <ChatBox count={index} chat={chat}/>
              ))}
            </Chats>
        <Display>
        {postList.map(p=>(<Post key={p._id} post={p} />))}
        </Display>
    </Content>
  </Container>
  </>
  )
}

export default MyPost;
