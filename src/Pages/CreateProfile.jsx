import { LinearProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app, { db } from "../config/firebase-config";
import { checkUser, getUserDetails, updateUser } from '../ApiCalls/User';
import { useDispatch, useSelector } from 'react-redux';
import { endLoading, startLoading } from '../Redux/UserRedux';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../Components/FileUpload';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';

const Container=styled.div`
    width:100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: space-around;
    align-items: flex-start;
    /* min-height:100vh; */
`
const Section=styled.div`
    width:90%;
    margin:1rem 0;
    background-color: #cae8ef;
    >section{
        background-color: #2782aa;
        padding:0.5rem;
        font-size:1.5rem;
        color:white;
    }
    >div{
        padding:0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        /* justify-content: space-between; */
    }
`
const Left=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width:70%;
`
const Right=styled.div`
  width:30%;
`
const Submit=styled.div`
  text-align:center;
  display: flex;
  flex-direction: column;
  width:100%;
  margin:2rem;
`
const Button=styled.button`
    padding:0.2rem 1rem;
    cursor:pointer;
    color:black;
    margin:auto;
    border:3px solid #2ce4de;
    border-radius:50px;
    text-align:center;
    font-size:2rem;
    background:white ;
    /* background: padding-box fixed, linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%) border-box; */
    &:hover{
        background: linear-gradient(-45deg, #2ae88a 0%, #08aeea 100%) border-box;
    }
`
const CreateProfile = () => {
  const token=useSelector(state=>state.token);
  const loading=useSelector(state=>state.loading);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [inputs,setInputs]=useState([]);
  const [image,setImage]=useState("https://cdn-icons-png.flaticon.com/512/1053/1053244.png");
  const [file,setFile]=useState([]);
  const [error,setError]=useState(null);
  //uploading file to firebase
  useEffect(()=>{
    if(file.length){
      const fileName=new Date().getTime()+file[0].name;  
      const storage=getStorage(app);
      const storageRef=ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef, file[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // Handle unsuccessful uploads
          console.log('error at image upload'+error)
        },
        async() => {
          // Handle successful uploads on complete
          await getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            setImage(downloadURL);
            console.log(downloadURL);
          });
        }
      );
    }
  },[file])
  const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
  }
  const handleSubmit=async()=>{
    if(!inputs.name){
      setError('Name is required')
      return ;
    }
    setError(null);
   
    const data={
      about:inputs.about,
      designation:inputs.designation,      
      name:inputs.name,
      phone:inputs.phone,
      dob:inputs.dob,
      photo:image,
      social_links:{
        github:inputs.github,
        instagram:inputs.instagram,
        linkedIn:inputs.linkedIn,
      },
      address:{
        city:inputs.city,
        country:inputs.country,
        state:inputs.state,
        pincode:inputs.pincode,
      }
    }
    // console.log(data);
    dispatch(startLoading());
    const res=await updateUser(token,data);
    dispatch(endLoading());
    console.log(res);
    if(res.status==200){
      const usercheck=await checkUser(token);
      console.log(usercheck)
      if(usercheck.status===200){
          console.log({
            uid: usercheck.data.uid,
            displayName:data.name.toLowerCase(),
            email:usercheck.data.email,
            photoURL:data.photo,
          })

        

        // create user on firestore
        await setDoc(doc(db, "users",usercheck.data.uid), {
          uid: usercheck.data.uid,
          displayName:data.name.toLowerCase(),
          email:usercheck.data.email,
          photoURL:data.photo,
        });
        
        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", usercheck.data.uid), {});
      }

      navigate('/home');

    }
    else setError(res.error);
  }
  const handleChange2=(e)=>{
    const date=(e.$y+"-"+(e.$M+1)+"-"+e.$D);
    // console.log(date)
    setInputs({...inputs,dob:date});
  }
  return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{position:'fixed',top:'0',width:'100%'}}>
        {loading && <LinearProgress sx={{width:'100%'}}/>}
      </div>
      <h2 style={{textAlign:'center'}}>Complete Your Profile</h2>
    <Container>
      <Left>
      <Section>
        <section>Personal Details</section>
        <div>
            <TextField onChange={handleChange} name="name" label="Name" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="about" label="About" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="designation" label="Institute/Organization" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="phone" label="Contact Number" variant="outlined" sx={{margin:'0.5rem'}}/>
            <DatePicker onChange={handleChange2} name="dob" label="Date of Birth" sx={{margin:'0.5rem'}}/>
            
        </div>
      </Section> 
      
      <Section>
        <section>Residence Details</section>
        <div>
            <TextField onChange={handleChange} name="city" label="City" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="state" label="State" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="country" label="Country" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="pincode" label="Zip Code" variant="outlined" sx={{margin:'0.5rem'}}/>
        </div>
      </Section>
      <Section>
        <section>Social Profile Links</section>
        <div>
            <TextField onChange={handleChange} name="linkedIn" label="LinkedIn" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="instagram" label="Github" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField onChange={handleChange} name="github" label="Instagram" variant="outlined" sx={{margin:'0.5rem'}}/>
        </div>
      </Section>
      
      </Left>
      <Right>
        <FileUpload fileList={file} setFileList={setFile} single/>
      </Right>
    </Container>
    <Submit>
    {error&&  <span style={{color:'red',fontSize:'1.5rem',margin:'1rem'}}>{error}</span>}
    <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
    </Submit>
    </LocalizationProvider>

  )
}

export default CreateProfile
