import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {Topbar} from '../Components'
import Block from '../Components/Block';
import ChatBox from '../Components/ChatBox';
import Feed from '../Components/Feed';
import Right from '../Components/Right';
import Sidebar from '../Components/Sidebar';
import {mobile} from '../responsive'
import Modal from '@mui/material/Modal';
import CreatePost from '../Components/CreatePost';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, addUserDetails, endLoading, removeUser, startLoading, updateFails } from '../Redux/UserRedux';
import { getUserDetails } from '../ApiCalls/User';
import { getAllPosts } from '../ApiCalls/Post';
import Loader from '../Components/Loader';
import HomeLoader from '../Components/HomePageLoader';


const Container=styled.div`
    width: 100%;
    min-height: 100vh;

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
const Main = ({handleOpen}) => {
  const [list,setList]=useState('');
  const showList=(val)=>setList(val);
  const navigate=useNavigate();

  // fetch profile and friends details
  const token=useSelector(state=>state.token);
  const details=useSelector(state=>state.details);
  const chatUserList=useSelector(state=>state.chatUsers);
  const [detailsFetched,setDetailsFetched]=useState(false);
  const [fetching,setFetching]=useState(true);
  const dispatch=useDispatch();

  const loadProfile=async()=>{
    if(!token){
      console.log('no token')
      // return ;
    }
    // setFetching(true)  //by default fetching is true
    var res=await getUserDetails(token);  //put await here to stop further execution untill you get response
    console.log(res.data);
    if(res.status===200){
      dispatch(addUserDetails(res.data));
      setDetailsFetched(true);
    }
    else if(res.status===404){
      console.log(404)
      dispatch(updateFails(true))
      // dispatch(removeUser());
    }
    else{}
    setFetching(false);
  }
  useEffect(()=>{
    console.log(chatUserList)
    console.log('fetching profile')
    if(details){
      setFetching(false)
      setDetailsFetched(true)
    }
    else{
      loadProfile();
    }
    window.scrollTo(0,0)
  },[])
  useEffect(()=>{
    if(fetching===false && detailsFetched===false){
      console.log('navigating')
      setTimeout(()=>{
        dispatch(removeUser());
        navigate('/')
      },5000)
    }
  },[fetching])
  
  return (
    <>
 {fetching?<HomeLoader/>:(
      detailsFetched?
      (<Container>
      <Topbar handleOpen={handleOpen}/>
      <Content>
           <Sidebar showList={showList}/>
           <Block list={list} showList={showList} />
            <Right/>
            <Display>
              <Feed handleOpen={handleOpen}/>
            </Display>
      </Content>
      </Container>):
      <HomeLoader />
    )
  }
    </>

  )
}

export default Main