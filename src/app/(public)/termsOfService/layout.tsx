'use client';
import React from 'react';
import { Container } from '@mui/material';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container fixed maxWidth="md">
      {children}
    </Container>
  );
}
