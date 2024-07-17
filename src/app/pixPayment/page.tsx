"use client"
import { PixPaymentMain } from "@/components/pix-payment-main";
import { useValue } from "@/hooks/useValue";
import axios from "axios";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DefaultLayout } from "@/components/default-layout";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";



const PixPayment=({searchParams}: {searchParams:{idBuy:string}})=>{
  const {setUserInfo}= useValue();
  const router = useRouter();
  useEffect(()=>{ 
    getValues();
  },[])
  const getValues = async()=>{
    const response = await axios.get(`http://localhost:3000/users?identificatorBuy=${searchParams.idBuy}`)
    if(response.data[0].paidPix){
      router.push(`http://localhost:3001/pixCreditCard?idBuy=${response.data[0].identificatorBuy}`)
    } else{
      setUserInfo(response.data[0]);
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