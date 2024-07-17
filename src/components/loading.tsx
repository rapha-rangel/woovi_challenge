import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Stack sx={{ display: 'flex', justifyContent: "center",marginBottom:"10px" }} spacing={2} direction="row">
      <CircularProgress color="success" />
    </Stack>
  );
}