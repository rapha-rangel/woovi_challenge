'use client'
import { PixCreditCardMain } from "@/components/pix-credit-card-main";
import { useValue } from "@/hooks/useValue";
import axios from "axios";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DefaultLayout } from "@/components/default-layout";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";

const PixCreditCard= ()=> {
  const {setUserInfo}= useValue();
  const searchParams = useSearchParams();
  const formatIdBuy = searchParams.toString().slice(6,searchParams.toString().length);

  useEffect(()=>{
    getValues(formatIdBuy)
  },[])

  const getValues = async(idBuy:string)=>{
    try{
      const response = await axios.get(`https://json-server-woovi-db.vercel.app/users?identificatorBuy=${idBuy}`)
      if(response.data[0].paidPix ===true) {
        console.log(response.data[0])
        setUserInfo(response.data[0]);
      } else{
        const idUser =response.data[0].id;
        const params={...response.data[0],paidPix: true};
        console.log(params)
        setUserInfo(params);
        await axios.put(`https://json-server-woovi-db.vercel.app/users/${idUser}`,params);
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <DefaultLayout>
      <Header/>
      <PixCreditCardMain/>
      <Footer/>
    </DefaultLayout>
  )
}

export default dynamic (()=> Promise.resolve(PixCreditCard), {ssr: false})