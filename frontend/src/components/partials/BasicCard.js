import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({request}) {

  return (
    <Card >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {request.location}
          </Typography>
          <Typography variant="h5" component="div">
            {request.status}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {request.userid}
          </Typography>
          <Typography variant="body2">
            {request.instrumentid}
            <br />
            {request.genreid}
          </Typography>
      </CardContent>

    </Card>
  );
}
