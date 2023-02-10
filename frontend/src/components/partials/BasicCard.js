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

export default function BasicCard({request, instrument, genre, contact}) {

  return (
    <Card >
      <CardContent>
        <Typography variant="h5" color="text.secondary" gutterBottom>
            {request.location} -- {request.status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            contact name: {contact}
          </Typography>
          <Typography variant="body2">
            We need: {instrument}
            <br />
            We play {genre}
          </Typography>
      </CardContent>

    </Card>
  );
}
