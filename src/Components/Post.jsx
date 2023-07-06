import React, { useEffect, useRef, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { addComment, addLike, checkLike, countComment, countLike, deletePost, getAllCommentsOfPost, removeLike } from '../ApiCalls/Post';
import { CircularProgress, Tooltip } from '@mui/material';
import Comment from './Comment';
import {convertDate}  from '../Service.js'
import { MoreHoriz } from '@mui/icons-material';
import { addAlert } from '../Redux/UserRedux';
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
    position: relative;
    ${mobile({
      // height:'2rem'
    })}
`
const Avatar=styled.img`
  width:50px;
  height:50px;
  aspect-ratio:1/1;
  border-radius:50%;
  ${mobile({
      width:'40px',
      height:'40px',
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
      fontSize:'1rem',
    })}
`
const Date=styled.span`
    margin:0;
    font-size:0.8rem;
    color:gray;
    font-weight:600;
    line-height:normal;
    ${mobile({
      fontSize:'0.6rem',
    })}
`
const Caption=styled.div`
    width:100%;
    font-size:${props=>props.noImage?'2rem':'1.5rem'};
    margin:${props=>props.noImage?'1rem':'0rem'};
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
    max-height:40rem;
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
    justify-content:space-around;
    border-top:1.4px solid rgba(0,0,0,0.5);
    border-opacity:0.4;
    
    ${mobile({
      minHeight:'1rem',
      borderTop:'1px solid rgba(0,0,0,0.5)'

    })}
`
const Action=styled.div`
    color:black;
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
    /* width:30%; */
    color:gray;
    >svg{

    }
    ${tab({
      fontSize:'1rem',
      flexDirection:'column'
    })}
    ${mobile({
      fontSize:'0.8rem',
    })}
`
const InputBox=styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width:100%;
  background-color: #e1f2f7;
  border-radius:25px;
  margin:0.4rem 0;
  ${mobile({
      minHeight:'1.5rem'
  })}
`

const TextArea=styled.textarea`
  /* height:auto; */
  color:#999;
  font-weight:400;
  font-size:1.2rem;
  font-family:'Ubuntu', Helvetica, Arial, sans-serif;
  width:80%;  
  /* margin: auto; */
  line-height:normal;
  background-color: inherit;
  outline:none;
  border:none;
  padding:0.5rem;
  &::-webkit-scrollbar {
      width: 0;
    } 
  transition: height 0.2s ease;
  ${tab({
    fontSize:'1rem'
  })}
  ${tab({
    fontSize:'0.8rem'
  })}
`
const CommentBox=styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow:hidden;
  max-height:${props=>props.show?'200vh':'0'};
  transition: max-height 1s ease; 
`


const Post = ({post,fetchAllPosts}) => {
    let width = window.innerWidth;
    const cap=post.caption;
    const [wholeCap,setWholeCap]=useState(false);
    const [like,setLike]=useState(false);
    const [dateofpost,setdateofpost]=useState("");
    const myDetails=useSelector(state=>state.details)
    const commentRef=useRef();
    const dispatch=useDispatch();
     //for auto expand input
    const autoExpand = (e)=>{
      var element = typeof e === 'object' ? e.target : document.getElementById(e);
      var scrollHeight = element.scrollHeight; 
      element.style.height =  scrollHeight + "px";    
    };

    const token=useSelector(state=>state.token);
    const [load,setLoad]=useState(false);
    const [showComments,setShowComments]=useState(false);
    //count likes
    const [countLikes,setCountLikes]=useState('#');
    const [countComments,setCountComments]=useState('#');
    const [allComments,setAllComments]=useState([]);
    const count=async()=>{
      var res=await countLike(token,post._id,post.uid)
      if(res.status===200){
        setCountLikes(res.data);
      }
      res=await countComment(token,post._id)
      if(res.status===200)  setCountComments(res.data)
    }
    const likesPost=async()=>{
      console.log('liking a post')
      const res=await addLike(token,post._id,post.uid)
      console.log(res)
      if(res.status===200){
        setLike(true)
        count();
      }
    }
    const dislikesPost=async()=>{
      console.log('unliking a post')
      const res=await removeLike(token,post._id,post.uid)
      console.log(res)
      if(res.status===200){
        setLike(false)
        count();
      }
    }
    const commentPost=async()=>{
      var comment=commentRef.current.value;
      if(!comment)  return
      const data={
        uid:myDetails.uid,
        comment:comment
      }
      setLoad(true);
      const res=await addComment(token,post.uid,post._id,data);
      console.log(res);
      if(res.status===200){
        count();
        var r=await getAllCommentsOfPost(token,post._id);
        console.log('upating all comments')
        setAllComments(r.data.comments)
        setShowComments(true)
      }
      setLoad(false)
      commentRef.current.value=null;
    }
    const isLike=async()=>{
      const res=await checkLike(token,post._id,post.uid);
      if(res.status===200){
        if(res.data)  setLike(true);
        else setLike(false);
      }
    }
    const postDelete=async()=>{
      const res=await deletePost(token,post._id);
      console.log(res)
      if(res.status===200){
        fetchAllPosts();
        dispatch(addAlert('Post Deleted Successfully'));
      }
  }
    useEffect(()=>{
      console.log(post+"post")
      count();
      isLike();
      setdateofpost(convertDate(post.createdAt));
      setAllComments(post.comments);
    },[])
   
  return (
    <Container>
      <Details>
        <Avatar src={post.photo} />
        <Entry>
            <Name>{post.name}</Name>
            <Date>{dateofpost}</Date>
        </Entry>
        {post.uid===myDetails.uid?<Tooltip title="Delete Post">
                <MoreHoriz onClick={postDelete} sx={{cursor:'pointer',position:'absolute',right:'0'}} />
          </Tooltip>:""}
      </Details>
      {post.caption?<Caption noImage={post.images.length===0}>
        {(wholeCap||cap.length<150)?cap:cap.slice(0,150)}
        {cap.length>150 && 
        (!wholeCap?<span onClick={()=>setWholeCap(true)}>...see more</span>:<span onClick={()=>setWholeCap(false)}>...see less</span>)
        }
      </Caption>:""}
      
      {post.images.length?<Picture  src={post.images[0]}/>:""}
      
     <Actions>
          <Action like={like} onClick={like?dislikesPost:likesPost}>
            {like?<FavoriteIcon sx={{color:'red'}}/>
            :<FavoriteBorderIcon />}{countLikes} Likes
          </Action>
          <Action onClick={()=>setShowComments(showComments?false:true)}><ChatBubbleOutlineIcon/>{countComments} Comments</Action>
          <Action onClick={()=>setShowComments(false)}><ShareOutlinedIcon />Share</Action>
      </Actions>
      
      <InputBox contenteditable="true">
        <Avatar comment src={myDetails.photo}/>
        <TextArea id="TextArea" ng-model="loremIpsum" ref={commentRef}  onKeyUp={autoExpand} 
        placeholder={`Write Something Here.. ${myDetails.name.split(' ')[0]}`} />
        {load?<CircularProgress/>:<SendIcon sx={{color:'#6464d8',cursor:'pointer'}} onClick={commentPost}/>}
      </InputBox>
      <CommentBox  show={showComments} >
        {allComments.map(com=>(<Comment comment={com} postId={post._id} posterId={post.uid} setAllComments={setAllComments} count={count} allComments={allComments}/>))}
      </CommentBox>
    </Container>
  )
}

export default Post
