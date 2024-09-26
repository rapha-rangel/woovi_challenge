import { useValue } from "@/hooks/useValue";
import { FormatPaymentLimitDate } from "@/utils/format-payment-limit-date";
import styled from "@emotion/styled";
import { Button } from "./button";
import {copyIcon} from '../icons/index'
import { useState } from "react";

interface BoxTypes {
  $button: boolean |undefined
}

const Box = styled.div<BoxTypes>`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family:inherit ;
  gap:20px;
  margin: 35px 0 20px 0;
  display: flex;
  flex-direction: column;
  width:${props=> props.$button? "100%": "310px"} ;
`
const Text = styled.p`
  color: white;
  font-family:inherit ;
  font-size: 18px;
  font-weight: 600;
  line-height: 24.55px;
    span {
      &:first-of-type{
        text-transform: capitalize;
      }
      text-transform: uppercase;
  }
  svg{
    margin-left: 5px;
      width: 19px;
      height: 22px;
      transform: translateY(3px);
    }
`
const TermBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    font-family:inherit ;
    font-size: 16px;
    font-weight: 600;
    color: #B2B2B2;
    span{
      text-transform: capitalize;
    }
    &:last-of-type{
      color: #4D4D4D;
      font-family:inherit ;
      font-weight: 800;
    }
  }
`
export function PaymentBox(){
  const{userInfo}= useValue();
  const [clikedButton, setClikedButton] = useState(false);

  const handleClick= async()=>{
    try {
      await navigator.clipboard.writeText(`https://woovi-challenge-seven.vercel.app/pixCreditCard?idBuy=${userInfo?.identificatorBuy}`);
      setClikedButton(true)
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  };
    
  return(
    <Box
      $button={userInfo.paidPix}>
      {userInfo.paidPix?
        null
      :
        <Button
          click={clikedButton}
          type={"button"}
          handleClick={handleClick}>
            <Text><span>clique</span> para copiar<span> qr code</span> {copyIcon}</Text>
        </Button>
      }
      <TermBox>
        <p><span>prazo</span> de pagamento:</p>
        <p>{FormatPaymentLimitDate()}</p>
      </TermBox>
    </Box>
  )
}