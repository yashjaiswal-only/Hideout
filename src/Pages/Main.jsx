import React, { useState } from 'react'
import styled from 'styled-components';
import {Topbar} from '../Components'
import ChatList from '../Components/ChatList';
import Feed from '../Components/Feed';
import Notification from '../Components/Notification';
import Right from '../Components/Right';
import Sidebar from '../Components/Sidebar';
import {mobile} from '../responsive'
const Container=styled.div`
    width: 100%;
    
`
const Content=styled.div`
    width: 100%;
    position: relative;
    top:3rem;
    background-color: #e1f2f7;
`
const Display=styled.div`
    width:80%;
    margin-left:20%;
    display: flex;
    justify-content: space-around;
    ${mobile({
      width:'85%',
      marginLeft:'15%',
      justifyContent:'center'
    })}
`
const Main = () => {
  let width = window.innerWidth;
  const [notification,setNotification]=useState(true);
  const [chatlist,setChatlist]=useState(true);
  const toggleNotification=(val)=>{
    setNotification(val)
    setChatlist(false)
  }
  const toggleChat=(val)=>{
    setChatlist(val)
    setNotification(false);
  }
  return (
    <Container>
      <Topbar/>
      <Content>
           <Sidebar togNot={toggleNotification} togChat={toggleChat} />
           <Notification on={notification} togNot={toggleNotification}/>
           <ChatList on={chatlist} togChat={toggleChat}/>
           <Display>
              <Feed/> 
            {width>500 &&  <Right/>}
           </Display>
      </Content>
    </Container>
  )
}

export default Main