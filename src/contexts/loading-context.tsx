"use client"

import { ReactNode, createContext, useEffect, useState } from "react";
import {LoadingTypes} from "../types/loading-types";

interface LoadingProviderType{
  loading: {
    termBox: boolean
  };
    setLoading:(value:LoadingTypes )=> void
}

export const LoadingContext = createContext<LoadingProviderType>({
  loading: {
    termBox:false
  },
  setLoading:(value:LoadingTypes  )=> {}
})

interface ProviderProps{
  children: ReactNode
}

export function LoadingContextProvider({children}: ProviderProps){
  const [loading, setLoading]= useState({
    termBox: false
  });


  return(
    <LoadingContext.Provider
      value={{
        loading, setLoading
      }}>
      {children}
    </LoadingContext.Provider>
  )
}