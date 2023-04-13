import {Box,IconButton,Stack,Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import uploadImg from '../assets/cloud-upload.png';
import defaultimg from '../assets/default.png'
import jpg from '../assets/jpg.png'
import png from '../assets/png.png'
import jpeg from '../assets/jpeg.png'

  
  const CustomBox = styled(Box)({
    '&.MuiBox-root': {
      backgroundColor: '#fff',
    //   borderRadius: '2rem',
    //   boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      padding: '1rem',
    },
    '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
      opacity: 0.6,
    },
  });
  
  const FileUpload = ({fileList,setFileList,single}) => {
 
    const wrapperRef = useRef(null);
  
    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
  
    const onFileDrop = e => {
        const target = e.target ;
        if (!target.files) return;
        const newFiles = target.files;
        if (newFiles) {
            const updatedList = [...fileList, ...newFiles];
            console.log(updatedList);
            setFileList(updatedList);
        }
        return ;
    }

    const fileRemove = (file) => {
      const updatedList = [...fileList];
      updatedList.splice(fileList.indexOf(file), 1);
      setFileList(updatedList);
    };
  
    const calcSize = (size) => {
      return size < 1000000
        ? `${Math.floor(size / 1000)} KB`
        : `${Math.floor(size / 1000000)} MB`;
    };
  
    return (
      <>
        <CustomBox>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              position: 'relative',
              width: '100%',
              height: '13rem',
              border: '2px dashed #4267b2',
              borderRadius: '20px',
            }}
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
          >
            <label htmlFor="image" style={{width:'100%',height:'100%',cursor:'pointer'}}>
            <Stack justifyContent='center' sx={{ p: 1, textAlign: 'center',width:'100%',height:'100%' }}>
              <Typography sx={{ color: '#ccc' }}>
                {'Browse files to upload'}
              </Typography>
              <div>
                <img
                  src={uploadImg}
                  alt='file upload'
                  style={{ width: '5rem' }}
                />
              </div>
              <Typography variant='body1' component='span'>
                <strong>Supported Files</strong>
              </Typography>
              <Typography variant='body2' component='span'>
                JPG, JPEG, PNG
              </Typography>
            </Stack>
            </label>
           
            <input
              disabled={(single && fileList.length?true:false)}
                id='image'
                type='file'
                name={'image'}
                onChange={onFileDrop}
                multiple={single?false:true}
                accept='image/jpg, image/png, image/jpeg'
                style={{
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                }}
            />
          </Box>
        </CustomBox>
  
        {fileList.length > 0 ? (
          <Stack spacing={2} sx={{ my: 2 }}>
            {fileList.map((item, index) => {
              var imageType = item.type.split('/')[1] ;
              return (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    backgroundColor: '#f5f8ff',
                    borderRadius: 1.5,
                    p: 0.5,
                  }}
                >
                  <Box display='flex'>
                    <img
                      src={`${imageType==='png'?png:imageType==='jpg'?jpg:imageType==='jpeg'?jpeg:defaultimg}`}
                      alt='upload'
                      style={{
                        height: '3.5rem',
                        objectFit: 'contain',
                      }}
                    />
                    <Box sx={{ ml: 1 }}>
                      <Typography>{item.name}</Typography>
                      <Typography variant='body2'>
                        {calcSize(item.size)}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton onClick={() => {fileRemove(item)}}
                    sx={{
                      color: '#df2c0e',
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
        ) : null}
      </>
    );
  };
  
  export default FileUpload;
  