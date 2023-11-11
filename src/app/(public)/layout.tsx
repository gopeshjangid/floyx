'use client';
import React from 'react';
import { useTheme } from 'next-themes';
import Container from '@mui/material/Container';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <html lang="en">
      <body className={`${theme}-theme`}>
        <Container fixed maxWidth="md">
          {children}
        </Container>
      </body>
    </html>
  );
}
