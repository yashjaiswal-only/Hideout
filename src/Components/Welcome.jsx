import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper'; 
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Hiring from '../assets/Hiring.gif'
import SocialMedia from '../assets/Social media.gif'
import Youtube from '../assets/Video tutorial.gif'
import styled from 'styled-components';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Experience the extraordinary with our brand',
    imgPath:SocialMedia,
  },
  {
    label: 'Unleash your entertainment',
    imgPath:Hiring,
  },
  {
    label: 'Changing People For The Better',
    imgPath:Youtube,
  },
];

const Image=styled.img`
    width:100%;
    height:60vh;

`
function SwipeableTextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
    console.log(step)
  };

  return (
    <Box sx={{width:'90%', flexGrow: 1 ,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
    <Paper
      square
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'none',
        background:'none'
      }}
    >
      <Typography sx={{ fontFamily:'Georgia, serif',fontSize:'1.5rem',
      font: 'bold 1.5rem Poppins, sans-serif',
      backgroundImage: 'linear-gradient(60deg, #E21143, #FFB03A)',
      backgroundClip: 'text',
      color: 'transparent'
  }}>{images[activeStep].label}</Typography>
    </Paper>
    <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {images.map((step, index) => (
        <div key={step.label}>
          {Math.abs(activeStep - index) <= 2 ? (
            <Image src={step.imgPath}/>
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      sx={{
        '.MuiMobileStepper-dot': { backgroundColor: '#CCCCCC' },
        '.MuiMobileStepper-dotActive': { backgroundColor: 'green' },
    }}
      nextButton={
        // <Button
        //   size="small"
        //   onClick={handleNext}
        //   disabled={activeStep === maxSteps - 1}
        // >
        //   Next
        //   {theme.direction === 'rtl' ? (
        //     <KeyboardArrowLeft />
        //   ) : (
            <KeyboardArrowRight sx={{color:'#CCCCCC'}}/>
          // )}
        // </Button>
      }
      backButton={
        // <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //   {theme.direction === 'rtl' ? (
        //     <KeyboardArrowRight />
        //   ) : (
            <KeyboardArrowLeft sx={{color:'#CCCCCC'}}/>
        //   )}
        //   Back
        // </Button>
      }
    />
  </Box>
  );
}

export default SwipeableTextMobileStepper;