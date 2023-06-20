import React from 'react'
import {Box, Skeleton} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const HomeLoader = ({warning}) => {
  
  return (
    <div style={{width:'100vw',height:'100vh',position:'relative'}}>
        <LinearProgress sx={{height:'5px'}}/>
            <Box sx={{ pt: 0.5 ,height:'100%',width:'100%',position:'relative'}}>
              <Skeleton height="20%" width="100%" sx={{position:"absolute",top:'0'}}/>
              <Skeleton sx={{width:'20%',height:'100%',position:'absolute',left:'0'}}/>
              <Skeleton style={{padding:"02rem",width:'40%',margin:'10% 0 0 30%'}}/>
              <Skeleton style={{padding:"5rem",width:'60%',margin:'0% 0 0 30%'}}/>
              <Skeleton style={{padding:"5rem",width:'60%',height:'50%',margin:'0% 0 0 30%'}}/>
            </Box>
    </div>
  )
}

export default HomeLoader
