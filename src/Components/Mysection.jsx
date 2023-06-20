import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import pic from '../Data/pic.png';
import cover from '../Data/cover.jfif'
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsCount } from '../ApiCalls/Friend';
import { Navigate, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const Container=styled.div`
  width:90%;
  min-height:20vh;
  border-radius:15px;
  margin:0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    -moz-box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
    box-shadow: 0px 0px 5px 3px rgba(214,214,214,1);
  ${mobile({
    display:'none',
  })}
`
const Up=styled.div`
    flex-basis:50%;
    width:90%;
    margin:0.3rem 0;
    min-height:4rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const CoverImg=styled.img`
    width:100%;
    height:80%;
    border-radius:10px;
`
const Image=styled.img`
  width:50px;
  aspect-ratio:1/1;
  border-radius:50%;
  position:absolute;
  bottom:0;
`
const Down=styled.div`
    flex-basis:50%;
    width:90%;
    margin:0.3rem 0;
    display: flex;
    flex-direction: column;
`

const Span=styled.button`
    font-size:${props=>props.name?'0.9rem':'0.7rem'};
    font-weight:${props=>props.name?'600':'600'};
    color:${props=>props.name?'black':'gray'};
    background:none;
    border:none;
`
const Button=styled.button`
    border:none;
    border-radius:10px;
    padding:0.4rem 0;
    font-size:0.7rem;
    color:white;
    background-color: blue;
    cursor: pointer;
`
const Mysection = () => {
  const details=useSelector(state=>state.details);
  const token=useSelector(state=>state.token)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [count,setCount]=useState(0);
  useEffect(()=>{
    const getCount=async()=>{ //get friends count
      const res=await getFriendsCount(token)
      if(res.status===200)      setCount(res.data)
      else if(res.response.status===404)      dispatch(updateFails(true))
    }
    getCount();
  },[])
  return (
   <Container>
      {details?<>
        <Up >
            <CoverImg src={details.cover?details.cover:cover} />    
            <Image src={details.photo?details.photo:pic}/>
          </Up>
          <Down>
            <Span name={1}>{details.name}</Span>
            <Span >{count} friends</Span>
            <Button onClick={()=>navigate('/profile/'+details.uid)}>
                My Profile
            </Button>
          </Down>
      </>
     :<CircularProgress sx={{margin:'auto'}}/>}
    </Container>
  )
}

export default Mysection
