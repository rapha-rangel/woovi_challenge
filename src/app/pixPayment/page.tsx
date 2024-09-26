"use client"
import { PixPaymentMain } from "@/components/pix-payment-main";
import { useValue } from "@/hooks/useValue";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { DefaultLayout } from "@/components/default-layout";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";



const PixPayment=()=>{
  const [loading, setLoading] =useState(true);
  const {setUserInfo}= useValue();
  const router = useRouter();
  const searchParams = useSearchParams();
  const formatIdBuy = searchParams.toString().slice(6,searchParams.toString().length);

  useEffect(()=>{ 
    getValues(formatIdBuy);
  },[]);

  const getValues = async(idBuy: string)=>{
    console.log()
    const response = await axios.get(`https://json-server-woovi-db.vercel.app/users?identificatorBuy=${idBuy}`);
    console.log(response, idBuy)
    setLoading(true);
    const hasPaidPix =response.data[0].paidPix;
    if(hasPaidPix === false){
      setUserInfo(response.data[0]);
    } else{
      router.push(`/pixCreditCard?idBuy=${idBuy}`)
    }
    setLoading(false)
  }
  
  return (
    <>
    {!loading ? 
      <DefaultLayout>
        <Header/>
        <PixPaymentMain/>
        <Footer/>
      </DefaultLayout>
      : null
    }
    </>
  )
}


export default dynamic (()=> Promise.resolve(PixPayment), {ssr: false})