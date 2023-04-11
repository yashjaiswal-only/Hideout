import React from 'react'
import styled from 'styled-components'
import FileUpload from './FileUpload'
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
  return (
    <Container>
        <h2>New Post</h2>
        <label>Caption</label>
      <input placeholder='Caption'/>
      <FileUpload multiple name="images"/>
      <Button>Create</Button>
    </Container>
  )
}

export default CreatePost
