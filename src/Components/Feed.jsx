import React from 'react'
import styled from 'styled-components'
import Create from './Create'
import Post from './Post'
import {mobile} from '../responsive'

const Container=styled.div`
    width: 100%;
    display: flex;
    flex-direction:column;
    align-items: center;
    ${mobile({
      width:'100%'
    })}
`

const Feed = ({handleOpen}) => {
  return (
    <Container>
      <Create handleOpen={handleOpen}/>
       <Post/>
      {/* <Post/> 
      <Post/> */}
    </Container>  
  )
}

export default Feed;
