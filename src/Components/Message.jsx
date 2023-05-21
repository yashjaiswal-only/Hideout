import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Container=styled.div`
        .message {
          display: flex;
          margin:0.2rem 0.4rem;
          /* background-color: blue; */

          .messageInfo {
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
            max-width: 80%;
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

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    var total_miliseconds=(message.date.seconds+(message.date.nanoseconds)*0.00000001)*1000
    const messagedate=new Date(total_miliseconds);
    console.log(messagedate);
  }, [message]);

  return (
    <Container>
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
      >
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid? currentUser.photo: chat.photoURL} alt=""/>
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.message}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
    </Container>
  );
};

export default Message;
