'use client';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import Head from 'next/head';
import { FC } from 'react';
import NextAppDirEmotionCacheProvider from '@/components/ThemeRegistry/EmotionCache';
import MUIThemeProvider from '@/components/ThemeRegistry/MuiThemeProvider';

interface PageProviderProps {
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({ children }) => (
  <NextAppDirEmotionCacheProvider options={{ key: 'mui', prepend: true }}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <MUIThemeProvider>
      <PreferredThemeProvider attribute="class">
        {children}
      </PreferredThemeProvider>
    </MUIThemeProvider>
  </NextAppDirEmotionCacheProvider>
);

export default PageProvider;
