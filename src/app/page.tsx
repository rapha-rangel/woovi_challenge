"use client"
import { DefaultLayout } from "@/components/default-layout";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Main } from "@/components/main";
import dynamic from "next/dynamic";

const Home=()=> {


  return (
    <DefaultLayout>
      <Header/>
      <Main/>
      <Footer/>
    </DefaultLayout>
  )
}

export default dynamic (()=> Promise.resolve(Home), {ssr: false})