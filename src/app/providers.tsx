// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "rgb(31,50,66)",
        color: "white",
      },
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={customTheme}>{children}</ChakraProvider>;
}
