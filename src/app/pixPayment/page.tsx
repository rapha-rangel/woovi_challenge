"use client"
import { PixPaymentMain } from "@/components/pix-payment-main";
import { useValue } from "@/hooks/useValue";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DefaultLayout } from "@/components/default-layout";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";



const PixPayment=({searchParams}: {searchParams:{idBuy:string}})=>{
  const [loading, setLoading] =useState(true);
  const {setUserInfo}= useValue();
  const router = useRouter();
  useEffect(()=>{ 
    getValues();
  },[])
  const getValues = async()=>{
    setLoading(true)
    const response = await axios.get(`https://json-server-woovi-db.vercel.app/users?identificatorBuy=${searchParams.idBuy}`);
    console.log(response.data)
    if(response.data[0].paidPix){
      router.push(`/pixCreditCard?idBuy=${response.data[0].identificatorBuy}`)
    } else{
      setUserInfo(response.data[0]);
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