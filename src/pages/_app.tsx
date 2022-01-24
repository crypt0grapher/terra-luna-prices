import NextApp, { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import Head from "next/head";
import React, { useState } from "react";

import { AppDataContext } from "src/client/ssr/appData";
import TradeContext, { defaultTrade, ITradeContext } from "../client/hooks/tradeContext";
import { TradeParams } from "../shared/types/trade";
import { AppData } from "src/shared/types/app-data";
import { initializeFetch } from "src/shared/utils/fetch";
import theme from "src/client/theme/theme";
import createEmotionCache from "src/client/theme/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

class App extends NextApp<AppProps> {
  appData: AppData;
  tradeState: ITradeContext;

  constructor(props: AppProps) {
    super(props);

    this.appData = props.pageProps.appData || {};
    this.tradeState = defaultTrade;

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

    const [tradeParams, setTradeParams] = useState<ITradeContext>(this.tradeState);

    const setupTradeParams = (buyAt?: number, sellAt?: number) => {
      setTradeParams({ tradeParams: { buyAt, sellAt } });
    }

    return (
      <CacheProvider value={clientSideEmotionCache}>
        <Head>
          <title>Terra Luna Prices Dashboard</title>
        </Head>
        <AppDataContext.Provider value={this.appData}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <TradeContext.Provider value={{
              ...tradeParams,
              setTradeParams: setupTradeParams
            }}>
              <Component {...pageProps} />
            </TradeContext.Provider>
          </ThemeProvider>
        </AppDataContext.Provider>
      </CacheProvider>
    );
  }
}

export default App;
