import { CircularProgress, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getUserMinDetails } from '../ApiCalls/User';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { convertDate } from '../Service';
import { seeNotification } from '../ApiCalls/Notification';
import { useNavigate } from 'react-router-dom';
import PageLoader from './PageLoader';

const ListItem=styled.div`
    display: flex;
    /* margin:0.5rem 0; */
    padding:0.5rem 0.2rem;
    border-bottom:1px solid gray;
    background-color:${props=>props.seen?'':'#f0f9ff'};
    cursor: pointer;
    font-size:1.2rem;
`
const Image=styled.img`
    width:40px;
    height:40px;
    aspect-ratio:1/1;
    border-radius:50%;
`
const Text=styled.div`
    font-size:0.8rem; 
    font-weight:600;
    margin:0 0.2rem;
    >p{
        margin:0;
    }
    >span{
        font-size:0.7rem;
        color:gray;
    }
`
const Name=styled.span`
    font-weight:700;
`
const Notification = ({not}) => {
    const [load,setLoad]=useState(1);
    const [dateof,setDateof]=useState();
    const [link,setLink]=useState('/home');
    const token=useSelector(state=>state.token)
    const navigate=useNavigate();
    const [user,setUser]=useState({})
    const getDetails=async()=>{
        setLoad(true)
        const res=await getUserMinDetails(token,not.uid);
        if(res.status){
            setUser(res.data)
        }
        setLoad(false)
    }
    const getLink=()=>{
        if(not.action===1) setLink('/friends')
        else if(not.action===2) setLink('/profile/'+not.uid)
        else if(not.action>=3 ) setLink('/post/'+not.postUid+'/'+not.postid)
        // else if(not.action===3) setLink('/allposts/'+not.uid)
        // else if(not.action===4 || not.action===5) setLink('/post/'+not.postUid+'/'+not.postid)
        // else if(not.action===4) setLink('/post/'+not.postUid+'/'+not.postid)
        
    }
    useEffect(()=>{
        getDetails();
        setDateof(convertDate(not.createdAt))
        getLink();
    },[])
    const click=async()=>{
        console.log('seen')
        if(!not.seen){
            const res=await seeNotification(token,not.uid,not._id)
            console.log(res)
        }
        console.log(link)
        navigate(`${link}`);
    }
  return (
    <>{load?<>
        <div style={{display:'flex',justifyContent:'space-around'}}>
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" height={50} width="80%" style={{ marginBottom: 6 }}/>
        </div>
        </>:
        <ListItem seen={not.seen} onClick={click}>
            <Image src={user.photo}/>
            <Text>
                <p>
                {not.action===1?<>
                <Name>{user.name}</Name> has sent you friend request
                </>:""}
                {not.action===2?<>
                <Name>{user.name}</Name> has accepted your request , you both are friends
                </>:""}
                {not.action===3?<>
                <Name>{user.name}</Name> has recently posted something , have a look!
                </>:""}
                {not.action===4?<>
                <Name>{user.name}</Name> has liked your post
                </>:""}
                {not.action===5?<>
                <Name>{user.name}</Name> has commented on your post
                </>:""}
                {not.action===6.1?<>
                <Name>{user.name}</Name> replied to a comment in your post
                </>:""}
                {not.action===6.2?<>
                <Name>{user.name}</Name> replied to your comment in a post
                </>:""}
                </p>
                <span>{dateof}</span>
            </Text>
        </ListItem>
    }
    </>
  )
}

export default Notification
