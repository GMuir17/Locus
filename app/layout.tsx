"use client";
import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { QueryClientProvider, QueryClient } from "react-query";

import theme from "./theme/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 20,
          },
        },
      })
  );

  return (
    <html lang="en">
      <head />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body>{children}</body>
        </ThemeProvider>
      </QueryClientProvider>
    </html>
  );
}
