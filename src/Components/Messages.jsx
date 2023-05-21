import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import Message from "./Message";
import styled from "styled-components";
const Container=styled.div`
    display: flex;
    flex-direction: column;
    overflow-y:scroll;
    max-height:100%;
    &::-webkit-scrollbar {
      width: 0.3rem;               /* width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: outset;        /* color of the tracking area */
    }

    &::-webkit-scrollbar-thumb {
      background-color: #b6b6e4;    /* color of the scroll thumb */
      border-radius: 50px;       /* roundness of the scroll thumb */
      border: 1px solid white;  /* creates padding around scroll thumb */
    }
`
const Messages = ({chatId,chat}) => {
  const [messages, setMessages] = useState([]);
//   const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  console.log(messages)

  return (
    <Container className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} chat={chat}/>
      ))}
    </Container>
  );
};

export default Messages;
