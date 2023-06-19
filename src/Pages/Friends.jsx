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
import CreatePost from '../Components/CreatePost';
import { Modal } from '@mui/material';
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
const Friends = ({handleOpen}) => {
  const [list,setList]=useState('');
  const showList=(val)=>setList(val);
 
  return (<>
    <Container>
    <Topbar handleOpen={handleOpen}/>
    <Content>
         <Sidebar showList={showList}/>
         <Block list={list} showList={showList}/>
         <Display>
            <FriendsList /> 
            <FriendsRequest />
          </Display>
    </Content>
  </Container>
  </>
  )
}

export default Friends;
