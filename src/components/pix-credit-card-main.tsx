'use client'
import styled from "@emotion/styled";
import { PaymentBox } from "./payment-box";
import { PaymentTerm } from "./payment-term";
import { FormBox } from "./form-box";
import { useValue } from "@/hooks/useValue";


const MainBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 35px;
`
const Subtitle = styled.p`
  width: 400px;
  text-align: center;
  font-family: inherit;
  font-size: 24px;
  font-weight: 800;
  line-height: 32.74px;
  color: #4D4D4D;
`
export function PixCreditCardMain(){
  const {userInfo} = useValue();
  return (
    <MainBox>
      <Subtitle>{userInfo?.userName}, pague o restante em {userInfo?.termsValue?.length? userInfo?.termsValue?.length-1: 0}x no cartão</Subtitle>
      <FormBox/>
      <PaymentBox/>
      <PaymentTerm/>
    </MainBox>
  )
}