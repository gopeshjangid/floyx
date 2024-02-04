'use client';
import { ThemeProvider as PreferredThemeProvider } from 'next-themes';
import Head from 'next/head';
import { FC } from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import MUIThemeProvider from './MuiThemeProvider';
import Script from "next/script";

interface PageProviderProps {
  children: React.ReactNode;
}

const PageProvider: FC<PageProviderProps> = ({ children }) => (
  <PreferredThemeProvider enableSystem attribute="class">
    <NextAppDirEmotionCacheProvider options={{ key: 'mui', prepend: true }}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Script
          src="/assets/scripts/lang-config.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </Head>
      <MUIThemeProvider> {children} </MUIThemeProvider>
    </NextAppDirEmotionCacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
