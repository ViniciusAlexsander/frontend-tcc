import { useContext } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import createEmotionCache from "../styles/createEmotionCache";
import { AuthProvider } from "../context/AuthContext";
import { MenuLateral } from "../shared/components";
import {
  ColorModeContext,
  SwitchModeThemeProvider,
} from "../context/SwitchModeTHeme";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <SwitchModeThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MenuLateral>
            <Component {...pageProps} />
          </MenuLateral>
        </SwitchModeThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
