import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Container=styled.div`
        .message {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;

          .messageInfo {
            display: flex;
            flex-direction: column;
            color: gray;
            font-weight: 300;

            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .messageContent {
            max-width: 80%;
            display: flex;
            flex-direction: column;
            gap: 10px;

            p {
              background-color: white;
              padding: 10px 20px;
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
