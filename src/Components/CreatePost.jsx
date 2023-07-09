import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import FileUpload from './FileUpload'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../config/firebase-config";
import { useDispatch, useSelector } from 'react-redux';
import { makePost } from '../ApiCalls/Post';
import { CircularProgress } from '@mui/material';
import { addAlert, endLoading, startLoading } from '../Redux/UserRedux';
import mobile, { tab } from '../responsive';

const Container=styled.div`
    position: absolute;
    background:white;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 60%;
    min-height:60%;
    max-height:100%;
    overflow-y:scroll;
    border: 1px solid #000;
    box-shadow: 24px;
    padding:1rem;
    display: flex;
    flex-direction: column;
    ${mobile({
      width:'90%'
    })}
    ${tab({
      width:'80%'
    })}

    /* >input{
        padding:0.5rem;
        width:90%;
        outline:none;
        border:1px solid gray;
        border-radius:0.5rem;
    } */
    >h2{
        font-size:2rem;
    }
    >label{
      font-weight:600;
    }
`
const Button=styled.button`
    background-color: navy;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin:auto;
    width: max-content;
    cursor: pointer;
`
const TextArea=styled.textarea`
  height:auto;
  color:#999;
  font-weight:400;
  font-size:30px;
  font-family:'Ubuntu', Helvetica, Arial, sans-serif;
  width:95%;
  margin:1rem auto;
  background:#fff;
  border-radius:3px;
  line-height:normal;
  outline:none;
  border-radius:1.5rem;
  border:none;
  box-shadow:0px 0px 5px 1px rgba(0,0,0,0.1);
  padding:1rem;
  -webkit-transition: height 0.2s ease;
  -moz-transition: height 0.2s ease;
  -ms-transition: height 0.2s ease;
  -o-transition: height 0.2s ease;
  transition: height 0.2s ease;
  ${mobile({
    fontSize:'20px'
  })}
`
const CreatePost = ({handleClose}) => {
  const [fileList, setFileList] = useState([]);
  const [countUploaded,setCountUploaded]=useState(0);
  const token=useSelector(state=>state.token);
  // const loading=useSelector(state=>state.loading);
  const [loading,setLoading]=useState(false);
  const [sending,setSending]=useState(0);
  const dispatch=useDispatch();
  const captionRef=useRef();

  //submit the post
  const handleSubmit=async()=>{
    setLoading(true)
    console.log('click')
    if(!fileList.length){
      const data={
      caption:captionRef.current.value,
        likes:[],
        comments:[],
      }
      console.log(data)
      const res=await makePost(token,data);
      setLoading(false)
      console.log(res)
      if(res.status===200){
        handleClose();  
        dispatch(addAlert('Post Created Successfully'));
      }
      else if(res.response.status===404)       dispatch(updateFails(true))
    }
    else{
      var Images=[];
      fileList.forEach(file=>{
        const fileName=new Date().getTime()+file.name;  
        const storage=getStorage(app);
        const storageRef=ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            // const progress =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            // switch (snapshot.state) {
            //   case "paused":
            //     console.log("Upload is paused");
            //     break;
            //   case "running":
            //     console.log("Upload is running");
            //     break;
            //   default:
            // }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log('error at image upload')
          },
          async() => {
            // Handle successful uploads on complete
            await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
              Images.push(downloadURL);
              console.log(downloadURL);
              if(countUploaded===fileList.length-1){  //on last file upload
                const data={
                  caption:captionRef.current.value,
                  images:Images ,
                  likes:[],
                  comments:[],
                }
                console.log(data)
                const res=await makePost(token,data);
                setLoading(false)
                console.log(res);
                if(res.status===200){
                  handleClose();
                  dispatch(addAlert('Post Created Successfully'));
                }
                else if(res.response.status===404)       dispatch(updateFails(true))
                setCountUploaded(0);
              }
              setCountUploaded(countUploaded+1);
            });
          }
        );
      })
    }
  }
  
  //for auto expand input
  const autoExpand = (e)=>{
        var element = typeof e === 'object' ? e.target : document.getElementById(e);
    		var scrollHeight = element.scrollHeight; 
        element.style.height =  scrollHeight + "px";    
    };
  
  return (
    <Container>
    {loading?<CircularProgress sx={{margin:'auto'}}/>
      :<>
        <h2>New Post</h2>
        <TextArea id="TextArea" ng-model="loremIpsum" ref={captionRef}  onKeyUp={autoExpand} placeholder="Write something here..."/>
        <FileUpload fileList={fileList} setFileList={setFileList}/>
        <Button onClick={handleSubmit} disabled={sending} >{sending?<CircularProgress/>:'Create'}</Button>
      </>
    }
    </Container>

  )
}

export default CreatePost
