"use client";
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

function Error({ statusCode }) {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <Typography variant="h1" component="h2" gutterBottom>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Something went wrong.
      </Typography>
      <Box mt={4}>
        <Link href="/" passHref>
          <Button variant="contained" color="primary">
            Go back home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}


export default Error;
