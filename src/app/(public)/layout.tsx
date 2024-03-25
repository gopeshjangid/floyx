import React from 'react';
import { Box } from '@mui/material';
import { getMetaData } from '@/lib/SEO';
import Script from 'next/script';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GTM_ID = 'GTM-K2BL5J4Q';
  return (
    <Box>
      <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `,
        }}
      />
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-K2BL5J4Q"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>

      {children}
    </Box>
  );
}

export const metadata = getMetaData({
  title: 'Floyx | Decentralized World',
  verification: {
    google: 'eowgT3qgcbSAuaYSeRo-sKS6NlqI3O47qMCHd51VeEI',
  },
  description: 'Floyx | Decentralized World',
  openGraph: {
    images: ['/'],
  },
  generator: 'Next.js',
  applicationName: 'Floyx',
  referrer: 'origin-when-cross-origin',
  keywords: [],
  authors: [
    {
      name: 'FLoyx',
      url: '/',
    },
  ],
  creator: 'Floyx creator',
  publisher: 'Floyx publisher',
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
});
