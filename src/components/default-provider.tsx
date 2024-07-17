"use client"
import {ReactNode} from "react";
// import StyledComponentsRegistry from "@/components/registry";
import { ValueContextProvider } from "@/contexts/values-context";
import {  LoadingContextProvider } from "@/contexts/loading-context";


interface DefaultProviderProps {
  children: ReactNode;
}

export  function DefaultProvider({children}: DefaultProviderProps) {

  
  return (
      <ValueContextProvider>
        <LoadingContextProvider>
          {children}
        </LoadingContextProvider>
      </ValueContextProvider>
  )
}