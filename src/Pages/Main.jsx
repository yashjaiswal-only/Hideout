import React, { useState } from 'react'
import styled from 'styled-components';
import {Topbar} from '../Components'
import Block from '../Components/Block';
import ChatList from '../Components/ChatList';
import Feed from '../Components/Feed';
import Notification from '../Components/NotificationList';
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
const Main = () => {
  let width = window.innerWidth;
  const [list,setList]=useState('');
  const showList=(val)=>setList(val);
  
  return (
    <Container>
      <Topbar/>
      <Content>
           <Sidebar showList={showList} width={width}/>
           <Block list={list} showList={showList}/>
           {width>600 && <Right/>}

           <Display>
              <Feed/> 
            {/* {width>600 &&  <Right/>} */}
           </Display>
      </Content>
    </Container>
  )
}

export default Main