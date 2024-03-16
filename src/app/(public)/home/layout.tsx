import { Metadata } from 'next';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export const metadata: Metadata = {
  title: 'Floyx Home',
  description: 'Floyx Home',
};
