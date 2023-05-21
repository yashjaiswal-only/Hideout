import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Container=styled.div`
        .message {
          display: flex;
          /* background-color: blue; */
          margin:0.2rem 0;
          .messageInfo {
            margin:0rem 0.4rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            color: gray;
            font-weight: 300;
            font-size:0.6rem;

            img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .messageContent {
            max-width: 75%;
            display: flex;
            flex-direction: column;
            /* justify-content: flex-start; */
            gap: 10px;

            p {
              background-color: #f87979;
              /* color:white; */
              margin:0;
              padding: 5px 10px;
              border-radius: 0px 10px 10px 10px;
              max-width: max-content;
            }

            img {
              width: 50%;
            }
          }

          &.owner {
            flex-direction: row-reverse;

            .messageContent {
              align-items: flex-end;
              p {
                background-color: #8da4f1;
                color: white;
                border-radius: 10px 0px 10px 10px;
              }
            }
          }
        }
      
`
const Message = ({ message,chat }) => {
  const currentUser =useSelector(state=>state.details)
  const ref = useRef();
  const [timedif,setTimedif]=useState('Just now');
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    var total_miliseconds=(message.date.seconds+(message.date.nanoseconds)*0.00000001)*1000
    const messagedate=new Date(total_miliseconds);
    const now=new Date();
    var diff = now.getTime() - messagedate.getTime();   
    if(diff>=60000 && diff<3.6e+6){
      setTimedif(Math.floor(diff / (1000*60))+"m ago")      
    } 
    else if(diff>=3.6e+6 && diff<8.64e+7){
      setTimedif(Math.floor(diff / (1000*60*60))+"h ago")      
    }
    else if(diff>8.64e+7 && diff<2.628e+9){
      setTimedif(Math.floor(diff / (1000*60*60*24))+"d ago")      
    }
    else if(diff>2.628e+9 && diff<3.154e+10){
      setTimedif(Math.floor(diff / (1000*60*60*24*30))+"mon ago")      
    }
    else if(diff>3.154e+10){
      setTimedif(Math.floor(diff / (1000*60*60*24*30*365))+"y ago")
    }
  }, [message]);

  return (
    <Container>
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid? currentUser.photo: chat.photoURL} alt=""/>
        <span>{timedif}</span>
      </div>
      <div className="messageContent">
        {message.message&&<p>{message.message}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
    </Container>
  );
};

export default Message;
