'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import PageProvider from '@/components/ThemeRegistry/PageProvider';
import '../index.scss';
import AuthProvider from './context/AuthProvider';
import { ToastProvider } from '@/components/Toast/useToast';
import { initializeStore } from '@/lib/redux';
import NextTopLoader from 'nextjs-toploader';
import '../components/ThemeRegistry/global.css';
import { useTheme } from 'next-themes';
import { I18nextProvider } from 'react-i18next';
import i18n from "../components/i18next";


const initializeStoreValues = {
  earningsReducer: {},
  registerReducer: {},
  postsReducer: {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('dark');
  //console.log('currentTheme:', currentTheme);

  useEffect(() => {
    if (!resolvedTheme) return;
    setCurrentTheme(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-white dark:bg-black min-h-[100dvh] ${currentTheme}-theme`}
      >
        <ToastProvider>
           <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <Provider store={initializeStore(initializeStoreValues)}>
              <NextTopLoader
                color="#2299DD"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                zIndex={1600}
                //showAtBottom={false}
              />
              <PageProvider>{children}</PageProvider>
            </Provider>
          </AuthProvider>
           </I18nextProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
