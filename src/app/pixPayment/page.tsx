"use client"
import { PixPaymentMain } from "@/components/pix-payment-main";
import { useValue } from "@/hooks/useValue";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DefaultLayout } from "@/components/default-layout";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserInfoTypes } from "@/types/user-info";



const PixPayment=({searchParams}: {searchParams:{idBuy:string}})=>{
  const {setUserInfo, userInfo}= useValue();
  const router = useRouter();
  useEffect(()=>{ 
    getValues();
  },[])
  const getValues = async()=>{
    const response = await axios.get(`https://json-server-woovi-db.vercel.app/users?identificatorBuy=${searchParams.idBuy}`);
    console.log(response.data)
    if(response.data[0].paidPix){
      router.push(`/pixCreditCard?idBuy=${response.data[0].identificatorBuy}`)
    } else{
      const updateUser:UserInfoTypes ={
        id:response.data[0].id,
        userName: response.data[0].userName,
        identificatorBuy: response.data[0].identificatorBuy,
        totalValue: response.data[0].totalValue,
        termsValue: response.data[0].termsValue,
        paidPix: response.data[0].paidPix,
      }
      setUserInfo(updateUser);
    }
  }
  return (
    <DefaultLayout>
      <Header/>
      <PixPaymentMain/>
      <Footer/>
    </DefaultLayout>
  )
}


export default dynamic (()=> Promise.resolve(PixPayment), {ssr: false})