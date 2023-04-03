import React from 'react'
import styled from 'styled-components'
const Container=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: blue;
    min-height:100vh;
`
const Section=styled.div`
    width:80%;
    background-color: #dfdfdf;
    >section{
        background-color: #929292;
    }
`
const CreateProfile = () => {
  return (
    <Container>
      <h2>Complete Your Profile</h2>
      <Section>
        <section>Personal Details</section>
      </Section>
    </Container>
  )
}

export default CreateProfile
