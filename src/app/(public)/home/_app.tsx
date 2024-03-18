// import { Fragment, useEffect } from "react";
// import Head from "next/head";
// import type { AppProps } from "next/app";
// import { ThemeProvider, createTheme } from "@mui/material";
// import CssBaseline from "@mui/material/CssBaseline";

// import GlobalStyles from "./styles/global";

// export default function MyApp(props: AppProps) {
//   const { Component, pageProps } = props;
//   useEffect(() => {
//     // Remove the server-side injected CSS.
//     const jssStyles = document?.querySelector("#jss-server-side");
//     if (jssStyles && jssStyles.parentElement) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }, []);

//   const muiTheme = createTheme();

//   return (
//     <Fragment>
//       <Head>
//         <title>Floxy</title>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width"
//         />

//         <style
//           dangerouslySetInnerHTML={{
//             __html: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
// @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');
// @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
// `,
//           }}
//         />
//       </Head>
//       <ThemeProvider theme={muiTheme}>
//         {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
//         <GlobalStyles />
//         <CssBaseline />
//         <Component {...pageProps} />
//       </ThemeProvider>
//     </Fragment>
//   );
// }
