import React, { useState } from 'react'
import styled from 'styled-components';
import {Topbar} from '../Components'
import Block from '../Components/Block';
import ChatBox from '../Components/ChatBox';
import Feed from '../Components/Feed';
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
const Chats=styled.div`
  background-color: black;
`
const Main = () => {
  let width = window.innerWidth;
  const [list,setList]=useState('');
  const showList=(val)=>setList(val);
  
  const [count,setCount]=useState(0);
  const updateCount=(val)=>setCount(val);
  console.log(count)
  return (
    <Container>
      <Topbar/>
      <Content>
           <Sidebar showList={showList} width={width}/>
           <Block list={list} showList={showList} updateCount={updateCount}/>
            {width>600 && <Right/>}
            <Chats>
              {/* <ChatBox count={1}/>
              <ChatBox count={0}/>
              <ChatBox count={2}/> */}
            </Chats>
           <Display>
              <Feed/> 
            </Display>
      </Content>
    </Container>
  )
}

export default Main