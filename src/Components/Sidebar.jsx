import React from 'react'
import styled from 'styled-components'
import Mysection from './Mysection'
import SideMenu from './SideMenu'
import {mobile} from '../responsive'
const Container=styled.div`
    width: 20%;
    height:100vh;
    left:0;
    position:fixed;
    /* background-color: #ddf6e7; */
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index:10;
    ${mobile({
      width:'15%'
    })}
    
`

const Sidebar = ({togChat,togNot}) => {
  let width = window.innerWidth;
  return (
    <Container>
      { width>500 &&
      <Mysection />
      }
      <SideMenu togChat={togChat} togNot={togNot}/>
    </Container>
  )
}

export default Sidebar
