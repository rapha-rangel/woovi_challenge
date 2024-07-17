'use client'
import styled from "@emotion/styled";
import { Card } from "./card";
import { useState } from "react";
import { useValue } from "@/hooks/useValue";


const MainBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`
const CardBox = styled.div`
`
const Subtitle = styled.p`
  font-family: inherit;
  font-size: 24px;
  font-weight: 800;
  line-height: 32.74px;
  color: #4D4D4D;
`
export function Main(){
  const [select, setSelect] = useState(-2);
  const {userInfo} = useValue();
  const arr=[{valor:30500,total:30500},
            {valor:15500,total:30600},
            {valor:10196.66,total:30620},
            {valor:7725,total: 30900},
            {valor:6300,total:31500},
            {valor:5288.33,total:31699.98},
            {valor:4542.85,total: 31800}];
  const textRibbon = [{
      boldText: "🤑 R$ 300,00", text:" devolta no seu Pix"
    }, {
      boldText: "-3% de juros:", text:" Melhor opção de parcelamento"
    }]
  return(
    <MainBox>
      <Subtitle>{userInfo?.userName}, como você quer pagar?</Subtitle>
      <Card
        setSelect={setSelect}
        select={select}
        values={arr[0]}
        index={-1}
        pixText={"Pix"}
        textRibbon={textRibbon[0]}/>
      <CardBox>
        {arr && arr.map((num, index)=>{
          if(index >0){
            return(
            <Card
              setSelect={setSelect}
              select={select}
              values={num}
              index={index}
              key={index}
              pixText={"Pix Parcelado"}
              textRibbon={textRibbon[1]}/>
          )}}
          )}
      </CardBox>
    </MainBox>
  )
}