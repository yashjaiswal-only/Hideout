import React, { useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendIcon from '@mui/icons-material/Send';
import pic from '../Data/pic.png';
import picture from '../Data/pexels-maria-loznevaya-15237253.jpg'
import { mobile } from '../responsive';
const Container=styled.div`
    width:90%;
    /* min-height:35rem; */
    margin:0.5rem 0rem;
    position:relative;
    border-radius:10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: space-around; */
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
`
const Details=styled.div`
    width:95%;
    height:2.5rem;
    margin:0.3rem;
    display: flex;
    align-items: center;
    ${mobile({
      height:'2rem'
    })}
`
const Image=styled.img`
  width:6%;
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      width:'8%'
  })}
`
const Avatar=styled.img`
  width:7%;
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      width:'12%'
  })}
`
const Entry=styled.div`
    margin:0rem 0.6rem;
    display: flex; justify-content: center; flex-direction: column;
`
const Name=styled.span`
    margin:0;
    font-size:1rem;
    color:black;
    font-weight:600;
    ${mobile({
      fontSize:'0.8rem',
    })}
`
const Date=styled.span`
    margin:0;
    font-size:0.7rem;
    color:gray;
    font-weight:400;
    ${mobile({
      fontSize:'0.6rem',
    })}
`
const Caption=styled.div`
    width:95%;
    font-size:0.8rem;
    font-weight:600;
    text-align:justify;
    ${mobile({
      fontSize:'0.6rem'
    })}
    >span{
        font-weight:700;
        cursor:pointer;
        color:gray;
    }
`
const Picture=styled.img`
    width:95%;
    height:25rem;
    margin: 0.5rem 0;
    object-fit:fill;
    border-radius:15px;
    ${mobile({
      height:'15rem'
    })}
    
`
const Actions=styled.div`
    width:95%;
    min-height:3rem;
    display: flex;
    align-items: center;
    justify-content:space-between;
    border-top:1.4px solid rgba(0,0,0,0.5);
    border-opacity:0.4;
    /* border-bottom:1px solid gray; */
    
    ${mobile({
      minHeight:'1rem',
      borderTop:'1px solid rgba(0,0,0,0.5)'

    })}
`
const Action=styled.div`
    /* border:${props=>props.like?'1px solid red':'1px solid black'}; */
    /* color:${props=>props.like?'red':'black'}; */
    color:black;
    /* border:2px solid gray; */
    border-radius:15px;
    font-weight:600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-size:border;
    cursor:pointer;
    font-size:1rem;
    padding:0.2 1rem;
    height:100%;
    width:30%;
    color:gray;

    ${mobile({
      fontSize:'0.5rem',
      width:'30%'
    })}
`

const InputBox=styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width:95%;
  min-height:3rem;
  background-color: #e1f2f7;
  border-radius:25px;
  margin:0.4rem 0;
  ${mobile({
      minHeight:'1.5rem'
  })}
`
const Input=styled.input`
    width:70%;
    height:90%;
    background-color: inherit;   
    border:none;
    outline:none;
    font-size:1rem;
    ${mobile({
      fontSize:'0.6rem'
    })}
`
const Post = () => {
    let width = window.innerWidth;
    const cap='Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab consequatur nihil, voluptas, dolorem dolores esse quasi corrupti delectus magnam nam totam. Dolorum, corrupti esse dolores at quo nam ex!    Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab consequatur nihil, voluptas, dolorem dolores esse quasi corrupti delectus magnam nam totam. Dolorum, corrupti esse dolores at quo nam ex!Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ab consequatur nihil, voluptas, dolorem dolores esse quasi corrupti delectus magnam nam totam. Dolorum, corrupti esse dolores at quo nam ex!'
    const [wholeCap,setWholeCap]=useState(false);
    const [like,setLike]=useState(false);

  return (
    <Container>
      <Details>
        <Avatar src={pic} />
        <Entry>
            <Name>Yash Jaiswal</Name>
            <Date>7 Feb at 11:27pm</Date>
        </Entry>
      </Details>

      <Caption>
        {wholeCap?cap:cap.slice(0,100)}
         {!wholeCap?<span onClick={()=>setWholeCap(true)}>...see more</span>:<span onClick={()=>setWholeCap(false)}>...see less</span>}
      </Caption>

      <Picture  src={picture}/>
      
      <Actions>
          <Action like={like} onClick={()=>{setLike(~like)}}>
            {like?<FavoriteIcon sx={{color:'red',fontSize:`${width<500?'1rem':'2rem'}`}}/>
            :<FavoriteBorderIcon sx={{fontSize:`${width<500?'1rem':'2rem'}` }} />}1.5k Likes
          </Action>
          <Action><ChatBubbleOutlineIcon sx={{fontSize:`${width<500?'1rem':'2rem'}` }}/>Comments</Action>
          <Action><ShareOutlinedIcon sx={{fontSize:`${width<500?'1rem':'2rem'}` }}/>Share</Action>
      </Actions>
      
        <InputBox>
          <Image comment src={pic}/>
          <Input  placeholder="Write a Comment.." />
          <SendIcon sx={{color:'#6464d8',fontSize:`${width<500?'1rem':'2rem'}`}}/>
        </InputBox>

    </Container>
  )
}

export default Post
