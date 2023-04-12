import React, { useState } from 'react'
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
const Main = () => {
  const [list,setList]=useState('');
  const showList=(val)=>setList(val);
  
  //create post
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    console.log('open')
  }
  return (
    <Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <CreatePost handleClose={handleClose}/>
      </Modal>
      <Topbar/>
      <Content>
           <Sidebar showList={showList}/>
           <Block list={list} showList={showList} />
            <Right/>
            {/* <Chats>
              <ChatBox count={1}/>
              <ChatBox count={0}/>
              <ChatBox count={2}/>
            </Chats> */}
           <Display>
              <Feed handleOpen={handleOpen}/>
            </Display>
      </Content>
    </Container>
  )
}

export default Main