import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = ({ loading }) => {
  return (
    loading && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // height: '100vh',
        }}
      >
        <CircularProgress disableShrink={false} />
      </Box>
    )
  );
};

export default Loading;