import React from 'react';
import { getMetaData } from '@/lib/SEO';
import { Container } from '@mui/material';

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  description: 'Floyx | Decentralized World',
});
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
