import { TextField } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
const CreateProfile = () => {
    const [value, setValue] = React.useState('2014-08-18T21:11:54');
    const handleChange = (newValue) => {
        console.log(newValue)
        setValue(newValue); 
      };

  return ( 
    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <Container>
      <h2>Complete Your Profile</h2>
      <Section>
        <section>Personal Details</section>
        <div>
            <TextField  label="Name" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="About" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="Institute/Organization" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="Contact Number" variant="outlined" sx={{margin:'0.5rem'}}/>
            <DatePicker label="Date of Birth" sx={{margin:'0.5rem'}}/>
            
        </div>
      </Section>
      
      <Section>
        <section>Residence Details</section>
        <div>
            <TextField  label="City" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="State" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="Country" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="Zip Code" variant="outlined" sx={{margin:'0.5rem'}}/>
        </div>
      </Section>
      <Section>
        <section>Social Profile Links</section>
        <div>
            <TextField  label="LinkedIn" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="Github" variant="outlined" sx={{margin:'0.5rem'}}/>
            <TextField  label="Instagram" variant="outlined" sx={{margin:'0.5rem'}}/>
        </div>
      </Section>
      <Section>
        <section>Upload Photo</section>
        <div>
            
            <label for="file-upload" class="custom-file-upload">
                <CloudUploadIcon/> Profile Picture
            </label>
            <input id="file-upload" type="file"/>
        </div>
      </Section>
    </Container>
    </LocalizationProvider>

  )
}

export default CreateProfile
