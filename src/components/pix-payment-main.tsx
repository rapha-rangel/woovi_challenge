'use client'
import styled from "@emotion/styled";
import { PaymentBox } from "./payment-box";
import { PaymentTerm } from "./payment-term";
import { FormatMoney } from "@/utils/format-money";
import {QRCodeSVG} from 'qrcode.react';
import { UserInfoTypes } from "@/types/user-info";
import { useValue } from "@/hooks/useValue";

interface ButtonBoxTypes {
  $button: boolean| undefined
}

const MainBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`
const BorderQrCode = styled.div`
  outline: 2px solid #03D69D ;
  outline-offset: 15px;
  border-radius: 5px;
  margin-top: 35px;
`
const ButtonBox = styled.div<ButtonBoxTypes>`
  margin: 35px 0 20px 0;
  display: flex;
  flex-direction: column;
  width:${props=> props.$button? "100%": "310px"} ;
`
const Subtitle = styled.p`
  width: 300px;
  text-align: center;
  font-family: inherit;
  font-size: 24px;
  font-weight: 800;
  line-height: 32.74px;
  color: #4D4D4D;
`
export function PixPaymentMain(){
  const {userInfo} = useValue();
  console.log(userInfo)
  return (
    <MainBox>
      <Subtitle>{userInfo?.userName}, pague a entrada de R$ {FormatMoney(userInfo?.termsValue ?userInfo?.termsValue[0]: 0 )} pelo Pix</Subtitle>
      <BorderQrCode>
        <QRCodeSVG value={`http://localhost:3001/pixCreditCard?idBuy=${userInfo?.identificatorBuy}`} size={332}/>
      </BorderQrCode>
      <PaymentBox/>
      <PaymentTerm/>
    </MainBox>
  )
}



