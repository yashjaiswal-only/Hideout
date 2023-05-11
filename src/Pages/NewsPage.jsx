import React, { useEffect } from 'react'
import Topbar from '../Components/Topbar'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { addAlert } from '../Redux/UserRedux'
import News from '../Components/News'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Container=styled.div`
  width:100%;
  background-color: #e1f2f7;
  height:100vh;
  display: flex;
  flex-direction: column;
  `
const Options=styled.div`
  width:100%;
  display: flex;
  justify-content: space-between;
  margin-top:4rem;
  padding:0 2rem;
  h1{
    margin:0;
  }
`
const NewsPage = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(addAlert('Welcome to Hideout News'));      
  },[])

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("General");
  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category+'changed')
  };
  const capitalize=(s) =>{
    if(s=="") return ;
    return s.slice(0,1).toUpperCase() + s.slice(1);
  }
  return (
    <Container>
      <Topbar/>
      <Options>
          <h1>
            Top Headings - {capitalize(category !== "" ?category:query)}
          </h1>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={'General'}>General</MenuItem>
              <MenuItem value={'Bussiness'}>Bussiness</MenuItem>
              <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
              <MenuItem value={'Health'}>Health</MenuItem>
              <MenuItem value={'Science'}>Science</MenuItem>
              <MenuItem value={'Technology'}>Technology</MenuItem>
            </Select>
            <FormHelperText>Choose Category</FormHelperText>
          </FormControl>
      </Options>
      <News category={category} query={query}/>
    </Container>
  )
}

export default NewsPage