import pic from '../Data/pic.png'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import AttachmentIcon from '@mui/icons-material/Attachment';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
const Component=styled.div`
    height:70vh;
    width:80%;
    bottom:0.2rem;
    right:0.2rem;
    position:fixed;
    z-index:8;
    border-radius:15px;
    display: flex;
    flex-direction:row-reverse;
    @media  (max-width:600px){
      
    }
`
const Wrapper=styled.div`
    margin:0 0.5rem ;
    width:30%;
    height:100%;
    /* background-color: black; */
    border:1px solid black;
    border-radius:15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`
const Top=styled.div`
    height:15%;
    width:100%;
    background-color: #c8d3de;
    border-top-left-radius:inherit;
    border-top-right-radius:inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const Image=styled.img`
    width:20%;
    border-radius:50%;
    border:3px solid green;
`
const Name=styled.div`
    width:60%;
    font-weight:700;

    >p{
        margin:0;
        font-size:1.2rem;
    }
    >span{
        color:green;
    }
`
const Options=styled.div`
    width:10%;
`
const Middle=styled.div`
    height:80%;
    width:100%;
    background-color: white;
`
const Bottom=styled.div`
    height:15%;
    width:100%;
    background-color: #ffe4e4;
    border-bottom-left-radius:inherit;
    border-bottom-right-radius:inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Message=styled.input`
    width:70%;
    height:70%;
    border-radius:10px;
    border:none;
    outline:none;
    background-color: #e9f1f1;
`
const Icon=styled.span`
    width:10%;
`
const Chats = ({count}) => {
    const [message,setMessage]=useState('')
    const onChange=(e)=>{
        setMessage(e.target.value);
        console.log(e.target.value)
    }
    useEffect(()=>{
        console.log('count')
        console.log(count);
    },[count])
  return (
    <Component>
        {count>0 && 
            <Wrapper>
                <Top>
                    <Image src={pic}/>
                    <Name>
                        <p>Yash Jaiswal</p>
                        <span>Online</span>
                    </Name>
                    <Options><ClearIcon/></Options>
                </Top>
                <Middle></Middle>
                <Bottom>
                    <AttachmentIcon sx={{color:'gray'}}/>
                    <Message type='text' onChange={onChange} />
                    <Icon>
                        {message.length?<SendIcon sx={{color:'green',fontSize:"2rem"}} />:<MicIcon sx={{color:'green',fontSize:"2rem"}} />}
                    </Icon>
                </Bottom>
            </Wrapper> 
        }
     
    </Component>
  )
}

export default Chats
