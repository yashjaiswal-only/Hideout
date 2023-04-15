import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getUserMinDetails } from '../ApiCalls/User'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';    
import { convertDate } from '../Service'
import mobile from '../responsive'
import { addReply, getAllCommentsOfPost } from '../ApiCalls/Post'
const Container=styled.div`
    display: flex;  
    width:100%;
    padding:0.5rem;
    border-top:${props=>props.reply?'none':'0.2px solid gray'};
    >section{
        display: flex;
        flex-direction: column; 
        background-color: #e4e4e4;
        width:80%;
        padding:0.5rem 1rem;
        border-radius:2rem;
        border-top-left-radius:0;
        >div{
            font-size: 1.3rem;
            font-weight: 700;
        }
        >p{
            margin:0;
            font-size:1.3rem;
            font-weight:600;
            margin:0.6rem 0;
        }
        >span{
            >span{
                cursor: pointer;
                font-weight:600;
            }
        }
    }
    >img{
        margin:0 1rem;
        width:60px;
        height:60px;
        aspect-ratio:1/1;
        border-radius:50%;
    }
`
const Reply=styled.div`
    width:90%;
    margin-left:10%;
    overflow:hidden;    
    max-height:${props=>props.show?'200vh':'0'};
    transition: max-height 1s ease; 
`
const SingleReply=({r})=>{
    const [dateof,setDateOf]=useState();
    const [user,setUser]=useState(null);
    const token=useSelector(state=>state.token);
    const getMinDetails=async()=>{
        const res=await getUserMinDetails(token,r.uid)
        if(res.status===200){
            setUser(res.data);
        }
    }
    useEffect(()=>{
        getMinDetails();
        setDateOf(convertDate(r.createdAt));
    },[])
    return(
        user&&
        <Container reply>
            <img src={user.photo}/>
            <section>
                <div>{user.name}</div>
                <p>{r.reply}</p>
                <span>{dateof}</span>
            </section>
        </Container>
    )
}
const InputBox=styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  /* min-height:50px; */
  /* background-color: #e1f2f7; */
  border-bottom:1px solid black;
  background-color: #fff;
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
const Comment = ({comment,posterId,postId,setAllComments,count,allComments}) => {
    const token=useSelector(state=>state.token);
    const myDetails=useSelector(state=>state.details);
    const replyRef=useRef();
    const [showReply,setShowReply]=useState(false);
    const [allReply,setAllReply]=useState([]);
    const [user,setUser]=useState(null)
    const [load,setLoad]=useState(false);   
    const [dateof,setDateOf]=useState();
    //for auto expand input
    const autoExpand = (e)=>{
    var element = typeof e === 'object' ? e.target : document.getElementById(e);
    var scrollHeight = element.scrollHeight; 
    element.style.height =  scrollHeight + "px";    
    };
    const getMinDetails=async()=>{
        const res=await getUserMinDetails(token,comment.uid)
        if(res.status===200){
            setUser(res.data);
        }
    }
    const replyPost=async()=>{
        var reply=replyRef.current.value;
        if(!reply)  return
        const data={
          uid:myDetails.uid,
          reply:reply
        }
        setLoad(true);
        const res=await addReply(token,postId,comment._id,posterId,comment.uid,data);
        console.log(res);
        if(res.status===200){
          count();
          var r=await getAllCommentsOfPost(token,postId);
          console.log(r)
          setAllComments(r.data.comments)
        }
        setLoad(false)
        // replyRef.current.value=null;
      }
    useEffect(()=>{
        getMinDetails();
        setAllReply(comment.replies);
        setDateOf(convertDate(comment.createdAt));
        console.log('redenring comment')
    },[])
  return (
    <>
    {user?
    <>
    <Container>
        <img src={user.photo}/>
        <section>
            <div>{user.name}</div>
            <p>{comment.comment}</p>
            <span>{dateof}  &bull; <span onClick={()=>setShowReply(showReply?false:true)}>{showReply?'Collapse':`Reply (${allReply.length})`}</span></span>
        </section>
    </Container>
    <Reply show={showReply}>
        {
            allReply.map(r=>(
                <SingleReply r={r}/>
            ))
        }
        <InputBox contenteditable="true">
            <Image comment src={myDetails.photo}/>
            <TextArea id="TextArea" ng-model="loremIpsum" ref={replyRef}  onKeyUp={autoExpand}
            placeholder={`Write reply here ... ${myDetails.name}`} />
            {load?<CircularProgress/>:<SendIcon sx={{color:'#6464d8',cursor:'pointer',fontSize:`${"width"<500?'1rem':'2rem'}`}} onClick={replyPost}/>}
      </InputBox>
    </Reply>    
    </>:
    <CircularProgress/>
    }
    </>
  )
}

export default Comment
