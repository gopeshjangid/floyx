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
  <PreferredThemeProvider enableSystem>
    <NextAppDirEmotionCacheProvider options={{ key: 'mui', prepend: true }}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </NextAppDirEmotionCacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
