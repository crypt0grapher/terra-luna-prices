import NextApp, { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";

import { AppDataContext } from "src/client/ssr/appData";
import { AppData } from "src/shared/types/app-data";
import { initializeFetch } from "src/shared/utils/fetch";
import theme from "src/client/theme/theme";
import createEmotionCache from "src/client/theme/createEmotionCache";
import React from "react";

const clientSideEmotionCache = createEmotionCache();

class App extends NextApp<AppProps> {
  appData: AppData;

  constructor(props: AppProps) {
    super(props);

    this.appData = props.pageProps.appData || {};

    initializeFetch(this.appData.basePath);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <CacheProvider value={clientSideEmotionCache}>
        <Head>
          <title>Terra Luna Prices Dashboard</title>
        </Head>
        <AppDataContext.Provider value={this.appData}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </AppDataContext.Provider>
      </CacheProvider>
    );
  }
}

export default App;
