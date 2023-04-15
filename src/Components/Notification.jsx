import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getUserMinDetails } from '../ApiCalls/User';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { convertDate } from '../Service';

const ListItem=styled.div`
    display: flex;
    margin:1rem 0;
    /* background-color: red; */
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
    const [load,setLoad]=useState(false);
    const [dateof,setDateof]=useState();
    const token=useSelector(state=>state.token)
    const [user,setUser]=useState({})
    const getDetails=async()=>{
        setLoad(true)
        const res=await getUserMinDetails(token,not.uid);
        console.log(res);
        if(res.status){
            setUser(res.data)
        }
        setLoad(false)
    }
    useEffect(()=>{
        getDetails();
        setDateof(convertDate(not.createdAt))
    },[])
  return (
    <>{load?<CircularProgress/>:
        <ListItem>
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
