import React from 'react'
import {Box, Skeleton} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
const Loader = () => {
  return (
    <div style={{width:'100vw',height:'100vh'}}>
        <LinearProgress sx={{height:'5px'}}/>
            <Box sx={{ pt: 0.5 ,height:'100%',padding:'2rem'}}>
              <Skeleton height="20%" width="100%" />
              <Skeleton  variant="circular" width="100px" height="100px"/>
              <Skeleton style={{padding:"2rem",width:'40%'}}/>
              <Skeleton style={{padding:"0rem",width:'60%',height:'10%'}}/>
              <Skeleton style={{padding:"0rem",width:'90%',height:'40%'}}/>
            </Box>
    </div>
  )
}

export default Loader
