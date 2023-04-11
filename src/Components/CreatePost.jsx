import React, { useState } from 'react'
import styled from 'styled-components'
import FileUpload from './FileUpload'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../config/firebase-config";

const Container=styled.div`
    position: absolute;
    background:white;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    width: 60%;
    max-height:100%;
    overflow-y:scroll;
    border: 2px solid #000;
    box-shadow: 24px;
    padding:1rem;
    display: flex;
    flex-direction: column;
    >input{
        padding:0.5rem;
        width:90%;
        outline:none;
        border:1px solid gray;
        border-radius:0.5rem;
    }
    >h2{
        font-size:1.2rem;
    }
`
const Button=styled.button`
    background-color: navy;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    margin:auto;
    width: max-content;
`
const CreatePost = () => {
  const [fileList, setFileList] = useState([]);

  //submit the post
  const handleSubmit=()=>{
    var Images=[];
    fileList.forEach(file=>{
      const fileName=new Date().getTime()+file.name;  
      const storage=getStorage(app);
      const storageRef=ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log('upload starts')
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
          console.log('getting download links')
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            Images.push(downloadURL);
            console.log(downloadURL)
          });
          console.log('got download links')
        }
      );
      console.log('upload complete')
    })
    console.log('here')
    console.log(Images);

  }
  return (
    <Container>
        <h2>New Post</h2>
        <label>Caption</label>
      <input placeholder='Caption'/>
      <FileUpload fileList={fileList} setFileList={setFileList}/>
      <Button onClick={handleSubmit}>Create</Button>
    </Container>
  )
}

export default CreatePost
