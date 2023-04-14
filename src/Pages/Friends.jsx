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
import Warning from '../Components/Warning';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../Redux/UserRedux';
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
    width:80%;
    margin-left:20%;
    margin-right:25%;
    min-height:100vh;
    display: flex;
    /* align-items: center; */
    justify-content: space-around;
    ${tab({
      justifyContent:'center',
      flexDirection:'column-reverse'
    })}
    ${mobile({
      width:'85%',
      marginLeft:'15%',
    })}
`
const Friends = () => {
  const [list,setList]=useState('');
  const showList=(val)=>setList(val);

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
  return (<>
    <Container>
    <Topbar/>
    <Content onClick={()=>setFails(true)}>
         <Sidebar showList={showList}/>
         <Block list={list} showList={showList}/>
         <Display>
            <FriendsList setFails={setFails}/> 
            <FriendsRequest setFails={setFails}/>
          </Display>
    </Content>
    <Warning fails={fails}/>
  </Container>
  </>
  )
}

export default Friends;
