import React, { useEffect } from 'react'
import styled from 'styled-components'
import Mysection from './Mysection'
import SideMenu from './SideMenu'
import {mobile} from '../responsive'
const Container=styled.div`
    width: 20%;
    height:100vh;
    left:0;
    position:fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index:110;
    ${mobile({
      width:'15%'
    })}
    
`

const Sidebar = ({showList}) => {
  
  return (
    <Container>
      <Mysection/>
      <SideMenu showList={showList}/>
    </Container>
  )
}

export default Sidebar
