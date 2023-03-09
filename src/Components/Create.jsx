import React from 'react'
import styled from 'styled-components'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PollIcon from '@mui/icons-material/Poll';
import SendIcon from '@mui/icons-material/Send';
import pic from '../Data/pic.png';
import {mobile} from '../responsive'

const Container=styled.div`
    width:90%;
    background-color: white;
    min-height:7em;
    margin:1rem 0;
    border-radius:10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    ${mobile({
      minHeight:'4em',
      margin:'0.6rem 0'
    })}
`

const Options=styled.div`
    width:90%;
    height:55%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`
const Left=styled.div`
    width:70%;
    height:80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Option=styled.div`
    border:0.1rem solid gray ;
    height:80%;
    border-radius:10px;
    padding:0.2rem;
    margin:0rem 0.4rem;
    display: flex;
    align-items: center;   
    font-size:0.8rem;
    color:#655f5f;
    ${mobile({
      height:'60%',
      fontSize:'0.4rem',
      padding:'0 0.2rem'
    })}
   
`
const Right=styled.div`
    width:30%;
    /* text-align:right; */
    display: flex;
    justify-content: center; align-items: center;
    >select{
      border:0.1rem solid gray ;
      color:#655f5f;
      font-size:1rem;
      border-radius:15px;
      padding:0.2rem 0.3rem;
      outline:none;
      ${mobile({
        fontSize:'0.5rem',
        width:'80%'
      })}
    }
    
`

const InputBox=styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width:90%;
  height:45%;
  background-color: #e1f2f7;
  border-radius:10px;
`
const Input=styled.input`
    width:80%;
    /* height:100%; */
    background-color: #e1f2f7;   
    border:none;
    outline:none;
    font-size:1.2rem;
    ${mobile({
      fontSize:'0.6rem',
      width:'70%'
    })}
    /* padding:0 1rem; */
`
const Image=styled.img`
  width:10%;
  aspect-ratio:1/1;
  border-radius:50%;
  margin:4px;
  ${mobile({
    width:'10%'
  })}
`
const Create = () => {
  let width = window.innerWidth;
  return (
    <Container>
      <InputBox>
      <Image src={pic}/>
      <Input  placeholder="What in your mind , Yash ?" />
      <SendIcon sx={{color:'#6464d8'}}/>
      </InputBox>
      <Options>
        <Left>
        <Option><VideoCameraFrontIcon sx={{width:`${width>500?'2rem':'0.6rem'}`}}/>GoLive</Option>
        <Option><PermMediaIcon sx={{width:`${width>500?'2rem':'0.6rem'}`}}/>Image/Video</Option>
        <Option><PollIcon sx={{width:`${width>500?'2rem':'0.6rem'}`}}/>Poll/Activity</Option>
        </Left>
        <Right>
            <select>
              <option default>Public</option>
              <option>Private</option>
            </select>
        </Right>
      </Options>
      
    </Container>
  )
}

export default Create
