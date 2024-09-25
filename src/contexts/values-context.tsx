"use client"

import { ReactNode, createContext, useEffect, useState } from "react";
import {UserInfoTypes} from "../types/user-info";

interface ValueContextProviderType{
  userInfo: UserInfoTypes;
  setUserInfo:(value: UserInfoTypes)=>void
}

export const ValueContext = createContext<ValueContextProviderType>({
  userInfo: {
    id:"1",
    userName:"João",
    identificatorBuy: '',
    totalValue: 0,
    termsValue: [],
    paidPix: false,
  },
  setUserInfo:(value:UserInfoTypes )=> {}
})

interface ProviderProps{
  children: ReactNode
}

export function ValueContextProvider({children}: ProviderProps){
  const [userInfo, setUserInfo]= useState<UserInfoTypes>({
    id:"1",
    userName: "João",
    identificatorBuy: '',
    totalValue: 0,
    termsValue: [],
    paidPix: false,
  });


  return(
    <ValueContext.Provider
      value={{
        userInfo, setUserInfo
      }}>
      {children}
    </ValueContext.Provider>
  )
}