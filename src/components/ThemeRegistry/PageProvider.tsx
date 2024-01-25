'use client';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import Head from 'next/head';
import { FC } from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import MUIThemeProvider from './MuiThemeProvider';

interface PageProviderProps {
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({ children }) => (
  <PreferredThemeProvider
    enableSystem
    attribute="class"
    // defaultTheme="dark"
    // forcedTheme={
    //   typeof window !== 'undefined' &&
    //   window.localStorage.getItem('theme') === 'light'
    //     ? 'light'
    //     : 'dark'
    // }
  >
    <NextAppDirEmotionCacheProvider options={{ key: 'mui', prepend: true }}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider> {children} </MUIThemeProvider>
    </NextAppDirEmotionCacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
