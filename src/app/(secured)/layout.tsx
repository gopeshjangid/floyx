import React from 'react';
import PageProvider from '@/components/ThemeRegistry/PageProvider';
import DrawerAppBar from './drawer';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { getMetaData } from '@/lib/SEO';
import AuthProvider from '@/app/context/AuthProvider';
import { ToastProvider } from '@/components/Toast/useToast';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`data-theme`}>
        <PageProvider>
          <DrawerAppBar/>
          <Container fixed maxWidth='sm'>
           <Toolbar />
            <ToastProvider>
                <AuthProvider>
                   {children}
                </AuthProvider>
            </ToastProvider>
          </Container>
        </PageProvider>
      </body>
    </html>
  );
}


export const metadata =  getMetaData({title: "Floyx | Decentralized World", description: "Floyx | Decentralized World"});
