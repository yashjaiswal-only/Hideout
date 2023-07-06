import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import AttachmentIcon from '@mui/icons-material/Attachment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebase-config";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import Messages from './Messages';
import { updateChatList } from '../Redux/UserRedux';
import mobile, { tab } from '../responsive';

const Component=styled.div`
    height:70vh;
    width:30%;
    bottom:${props=>props.down?'-60vh':'0.2rem'};
    transition:bottom 0.5s ease;
    right:${props=>`${props.count*30}%`};
    /* transition:right 1s ease; */
    position:fixed;
    z-index:800;
    border-radius:15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    flex-direction:row-reverse;
    ${tab({
      // right:`${props=>`${props.count*30}%`}`,
      // width:'30%',
    })}
    @media only screen and (max-width:600px){
      right:0%;
      width:85%;
      height:90vh;
      bottom:${props=>props.down?'-80vh':'0.2rem'};
    }
`
const Wrapper=styled.div`
    margin:0 0.2rem ;
    width:100%;
    height:100%;
    border:1px solid black;
    border-radius:15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`
const Top=styled.div`
    height:15%;
    width:100%;
    background-color: #c8d3de;
    border-top-left-radius:inherit;
    border-top-right-radius:inherit;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const Image=styled.img`
    width:40px;
    height:40px;
    border-radius:50%;
    border:3px solid green;
`
const Name=styled.div`
    width:50%;
    font-weight:700;

    >p{
        margin:0;
        font-size:1.2rem;
    }
    >span{
        color:green;
    }
`
const Options=styled.div`
    width:20%;
    display: flex;
    flex-direction:row-reverse;
`
const Option=styled.span`
    border-radius:50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    &:hover{
        background-color: #d0dfec;
    }
`
const Middle=styled.div`
    height:80%;
    width:100%;
    background-color: white;
    position: relative;
`
const Bottom=styled.div`
    height:15%;
    width:100%;
    background-color: #ffe4e4;
    border-bottom-left-radius:inherit;
    border-bottom-right-radius:inherit;
    display: flex;
    justify-content: space-around;
    align-items: center;
    >label{
        cursor: pointer;
    }
`
const Message=styled.input`
    width:70%;
    height:70%;
    border-radius:10px;
    border:none;
    outline:none;
    background-color: #e9f1f1;
`
const Icon=styled.span` 
    /* width:10%; */
    cursor: pointer;
`
const ImgPreview=styled.img`
    position: absolute;
    bottom:1rem;
    width:50%;
`
const ChatBox = ({count,chat}) => {
  console.log(count)
    const [message,setMessage]=useState('')
    const [down,setDown]=useState(false)
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);
    const dispatch=useDispatch();
    const chatlist=useSelector(state=>state.chatUsers);
    const currentUser=useSelector(state=>state.details);
    var [chatId,setChatId]=useState(currentUser.uid > chat.uid? currentUser.uid + chat.uid: chat.uid + currentUser.uid);
    
    useEffect(()=>{
      console.log(img)
      if (img) {
        const storageRef = ref(storage, uuid());
  
        const uploadTask = uploadBytesResumable(storageRef, img);
  
        uploadTask.on(
          (error) => {
            //TODO:Handle Error
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              setImgUrl(downloadURL)
            });
          }
        );
      }
    },[img])
    const handleSend = async () => {
        const tempmsg=message
        setMessage("");
        if (img) {
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(),
              message:tempmsg?tempmsg:null,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: imgUrl,
            }),
          });

        } else {
          await updateDoc(doc(db, "chats", chatId), {
            messages: arrayUnion({
              id: uuid(),
              message:tempmsg?tempmsg:null,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        }
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".lastMessage"]: {
            message:tempmsg?tempmsg:null,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", chat.uid), {
          [chatId + ".lastMessage"]: {
            message:tempmsg?tempmsg:null,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
        console.log('message sent')
        setImg(null);
        setImgUrl(null);
      };
    const handleClose=()=>{
      var temp=[];
      chatlist.forEach(ele => {
          if(ele.uid!=chat.uid) temp.push(ele);
      });
      console.log(temp)
      dispatch(updateChatList(temp));
    }
    
  return (
    <Component count={count} down={down}>
    <Wrapper>
        <Top>
            <Image src={chat.photoURL}/>
            <Name>
                <p>{chat.displayName}</p>
                {/* <span>Online</span> */}
            </Name>
            <Options>
                <Option><ClearIcon onClick={handleClose}/></Option>
                <Option onClick={()=>{down?setDown(false):setDown(true)}}>
                {!down?<KeyboardArrowDownIcon />:<KeyboardArrowUpIcon/>}
                </Option>
                </Options>
        </Top>
        <Middle>
            <Messages chatId={chatId} chat={chat}/>
            {img&&<ImgPreview src={imgUrl}/>}
        </Middle>
        <Bottom>
            <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
            <AttachmentIcon sx={{color:'gray'}}/>
            </label>
            <Message type='text' onKeyUp={(e)=>(e.key==='Enter')?handleSend():""} onChange={(e)=>setMessage(e.target.value)} value={message}/>
            <Icon>
               <SendIcon onClick={handleSend} sx={{color:'green',fontSize:"2rem"}} />
            </Icon>
        </Bottom>
    </Wrapper> 
    </Component>

  )
}

export default ChatBox
