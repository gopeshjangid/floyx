import { Metadata } from 'next';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export const metadata: Metadata = {
  title: 'Floyx Register',
  description: 'Floyx Register',
};
