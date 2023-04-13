import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendIcon from '@mui/icons-material/Send';
import pic from '../Data/pic.png';
import picture from '../Data/pexels-maria-loznevaya-15237253.jpg'
import { mobile,tab } from '../responsive';
import { useSelector } from 'react-redux';
const Container=styled.div`
    width:90%;
    margin:0.5rem 0rem;
    padding:0.5rem 1rem;
    border-radius:10px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    ${mobile({
      // padding:'0.5rem 1rem'
    })}
`
const Details=styled.div`
    width:100%;
    height:60px;
    display: flex;
    align-items: center;
    ${mobile({
      // height:'2rem'
    })}
`
const Avatar=styled.img`
  width:50px;
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      // width:'12%'
  })}
`
const Entry=styled.div`
    margin:0rem 10px;
    display: flex; justify-content: center; flex-direction: column;
`
const Name=styled.span`
    margin:0;
    font-size:1.2rem;
    color:black;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.8rem',
    })}
`
const Date=styled.span`
    margin:0;
    font-size:0.8rem;
    color:gray;
    font-weight:600;
    line-height:normal;
    ${mobile({
      // fontSize:'0.6rem',
    })}
`
const Caption=styled.div`
    width:100%;
    font-size:1rem;
    font-weight:600;
    text-align:justify;
    ${mobile({
      // fontSize:'0.6rem'
    })}
    >span{
        font-weight:700;
        cursor:pointer;
        color:gray;
    }
`
const Picture=styled.img`
    width:100%;
    height:25rem;
    margin: 0.5rem 0;
    object-fit:fill;
    /* border-radius:15px; */
    ${tab({
      height:'20rem'
    })}
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
  justify-content: space-between;
  align-items: center;
  width:100%;
  /* min-height:50px; */
  background-color: #e1f2f7;
  border-radius:25px;
  margin:0.4rem 0;
  ${mobile({
      minHeight:'1.5rem'
  })}
`
const Image=styled.img`
  width:40px;
  aspect-ratio:1/1;
  border-radius:50%;
  margin:0.4rem;
  ${mobile({
      width:'8%'
  })}
`
const Input=styled.textarea`
    width:80%;
    height:max-content;
    background-color: inherit;   
    border:none;
    outline:none;
    font-size:1.2rem;
    ${mobile({
      fontSize:'0.6rem'
    })}
`
const TextArea=styled.textarea`
  /* height:auto; */
  color:#999;
  font-weight:400;
  font-size:1.2rem;
  font-family:'Ubuntu', Helvetica, Arial, sans-serif;
  width:95%;  
  margin: auto;
  line-height:normal;
  background-color: inherit;
  outline:none;
  border:none;
  padding:0.5rem;
  &::-webkit-scrollbar {
      width: 0;
    } 
  -webkit-transition: height 0.2s ease;
  -moz-transition: height 0.2s ease;
  -ms-transition: height 0.2s ease;
  -o-transition: height 0.2s ease;
  transition: height 0.2s ease;
`
const Post = ({post}) => {
    let width = window.innerWidth;
    const cap=post.caption;
    const [wholeCap,setWholeCap]=useState(false);
    const [like,setLike]=useState(false);
    const viewerPic=useSelector(state=>state.details.photo)
    const captionRef=useRef();
     //for auto expand input
    const autoExpand = (e)=>{
      var element = typeof e === 'object' ? e.target : document.getElementById(e);
      var scrollHeight = element.scrollHeight; 
      element.style.height =  scrollHeight + "px";    
    };
  return (
    <Container>
      <Details>
        <Avatar src={post.photo} />
        <Entry>
            <Name>{post.name}</Name>
            <Date>7 Feb at 11:27pm</Date>
        </Entry>
      </Details>
      <Caption>
        {(wholeCap||cap.length<150)?cap:cap.slice(0,150)}
        {cap.length>150 && 
        (!wholeCap?<span onClick={()=>setWholeCap(true)}>...see more</span>:<span onClick={()=>setWholeCap(false)}>...see less</span>)
        }
      </Caption>

      
      {post.images.length?<Picture  src={post.images[0]}/>:""}
      
     <Actions>
          <Action like={like} onClick={()=>{setLike(~like)}}>
            {like?<FavoriteIcon sx={{color:'red',fontSize:`${width<500?'1rem':'2rem'}`}}/>
            :<FavoriteBorderIcon sx={{fontSize:`${width<500?'1rem':'2rem'}` }} />}1.5k Likes
          </Action>
          <Action><ChatBubbleOutlineIcon sx={{fontSize:`${width<500?'1rem':'2rem'}` }}/>Comments</Action>
          <Action><ShareOutlinedIcon sx={{fontSize:`${width<500?'1rem':'2rem'}` }}/>Share</Action>
      </Actions>
      
         <InputBox contenteditable="true">
          <Image comment src={viewerPic}/>
          <TextArea id="TextArea" ng-model="loremIpsum" ref={captionRef}  onKeyUp={autoExpand} placeholder="What in your mind , Yash ?"/>
          {/* <Input  placeholder="Write a Comment.." /> */}
          {/* <span 
            className="input" 
            role="textbox" 
            contenteditable>
              99
          </span> */}
          <SendIcon sx={{color:'#6464d8',fontSize:`${width<500?'1rem':'2rem'}`}}/>
        </InputBox>

    </Container>
  )
}

export default Post
