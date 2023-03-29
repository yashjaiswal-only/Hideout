import React from 'react'
import styled from 'styled-components'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PollIcon from '@mui/icons-material/Poll';
import SendIcon from '@mui/icons-material/Send';
import pic from '../Data/pic.png';
import {mobile, tab} from '../responsive'

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
    padding:1rem 0;
`
const Left=styled.div`
    width:90%;
    /* height:0%; */
    background-color: yellow;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Option=styled.div`
    border:0.1rem solid gray ;
    border-radius:10px;
    padding:0.5rem;
    display: flex;
    align-items: center;   
    font-size:1rem;
    color:#655f5f;
    font-weight:600;
    ${tab({
      fontSize:'0.6rem',
      padding:'0.2rem'
    })}
    ${mobile({
      fontSize:'0.6rem',
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
    background-color: #e1f2f7;   
    border:none;
    outline:none;
    font-size:1.2rem;
    ${mobile({
      fontSize:'0.8rem',
      width:'70%'
    })}
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
  return (
    <Container>
      <InputBox>
        <Image src={pic}/>
        <Input  placeholder="What in your mind , Yash ?" />
        <SendIcon sx={{color:'#6464d8'}}/>
      </InputBox>
      <Options>
          {/* <Left> */}
            <Option><VideoCameraFrontIcon />GoLive</Option>
            <Option><PermMediaIcon />Image/Video</Option>
            <Option><PollIcon />Poll/Activity</Option>
          {/* </Left> */}
        {/* <Right>
            <select>
              <option default>Public</option>
              <option>Private</option>
            </select>
        </Right> */}
      </Options>
      
    </Container>
  )
}

export default Create
