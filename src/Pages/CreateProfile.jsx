import { LinearProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getUserDetails, updateUser } from '../ApiCalls/User';
import { useDispatch, useSelector } from 'react-redux';
import { endLoading, startLoading } from '../Redux/UserRedux';
import { useNavigate } from 'react-router-dom';

const Container=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height:100vh;
`
const Section=styled.div`
    width:80%;
    margin:1rem 0;
    background-color: #dfdfdf;
    >section{
        background-color: #929292;
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
const Button=styled.button`
    padding:0.2rem 1rem;
    cursor:pointer;
    color:black;
    margin:1rem 0;
    border:3px solid #2ae88a;
    border-radius:50px;
    text-align:center;
    font-size:1.4rem;
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
  const [error,setError]=useState(null);
  const handleChange=(e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value});
    console.log(inputs);
  }
  const handleSubmit=async()=>{
    if(!inputs.name){
      setError('Name is required')
      return ;
    }
    setError(null);
    const dummydata={about:"hii this is yash",
      city:"New Delhi",
      country:"India",
      designation:"nsut",
      github:"dfn",
      instagram: "dhjekj",
      linkedIn:"dffsaf",
      name:"yash",
      phone:"8130060493",
      pincode:"110092",
      state:"Delhi"
    }
    const data={
      about:inputs.about,
      designation:inputs.designation,      
      name:inputs.name,
      phone:inputs.phone,
      dob:inputs.dob,
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
    const res=await updateUser(token,dummydata);
    dispatch(endLoading());
    console.log(res);
    if(res.status==200){
      navigate('/profile');
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
    <Container>
      <h2>Complete Your Profile</h2>
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
      <Section>
        <section>Upload Photo</section>
        <div>
            <label htmlFor="file-upload" className="custom-file-upload">
                <CloudUploadIcon/> Profile Picture
            </label>
            <input id="file-upload" type="file"/>
        </div> 
      </Section>
      {error&&  <span style={{color:'red'}}>{error}</span>}
      <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
    </Container>
    </LocalizationProvider>

  )
}

export default CreateProfile
