import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { deleteAlert } from '../Redux/UserRedux';
const Container=styled.div`
    position: absolute;
    bottom:${props=>props.alert?'2rem':'-1rem'};
    opacity:${props=>props.alert?'1':'0'};
    transition:bottom 1s ease,opacity 1s ease;
    z-index:20000;
    left:50%;
    transform :translateX(-50%);
    padding: 0.5rem;
    border-radius: 10px;
    background-color: whitesmoke;
    font-weight: 600;
`
const Alert = () => {
  const alert=useSelector(state=>state.alert);
  // console.log(alert)
  const dispatch=useDispatch();
  const [showAlert,setShowAlert]=useState(false);
  useEffect(()=>{
    if(alert){
        setShowAlert(true)
        setTimeout(()=>{
            setShowAlert(false)
        },2000)
        setTimeout(()=>{
            dispatch(deleteAlert());
        },3000)
    }
  },[alert])
  return (
    <Container alert={showAlert}>
      {alert}
    </Container>
  )
}

export default Alert
