import styled from "@emotion/styled";
import { Divider } from "./divider";
import { arrowIcon, checkIcon } from "@/icons";
import { useValue } from "@/hooks/useValue";
import { FormatMoney } from "@/utils/format-money";
import { useLoading } from "@/hooks/useLoading";
import Loading from "./loading";

interface SelectBoxTypes{
  $index:number |undefined
  $paid: boolean| undefined
}

interface LineTypes{
  index:boolean
}
const PaymentTermBox=styled.div`
  display: flex;
  flex-direction: column;
  width: 429px;
  font-family: inherit;
`
const TermBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 9px;
`
const CheckBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  position: relative;
  transform: translateY(5px);
`
const SelectBox = styled.div<SelectBoxTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 16px;
  height: 16px;
  border: 2px solid ;
  
  border-color:${props=>props.$index===0?"#03D69D" : 
    props.$paid===true && props.$index===1? "#03D69D":"#E5E5E5"} ;
  background-color:${props => props.$paid && props.$index===0 ?"#03D69D": "none"} ;
  border-radius: 100%;
  svg{
    color:white;
    font-size: 11px;
    display: ${props => props.$paid ?"flex": "none"};
  }
`
const Line =styled.div<LineTypes>`
  display: ${props => props.index? "none": "flex"};
  margin-left: 7px;
  align-items: center;
  height: 16px;
  width: 2px;
  background-color: #E5E5E5;
`
const ValueBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;  
  gap:40px;
  width: 90%;
  position: relative;
  p{
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
    color: #4D4D4D;
    line-height: 24.55px;
    &:last-of-type{
      font-family:inherit ;
      font-weight: 800;
    }
    span{
      position: absolute;
      top:-20%;
      font-size: 12px;
    }
  }
`
const TaxBox =styled.div`
  display: flex;
  justify-content: space-between;
  font-family: inherit;
  p{
    color: #4D4D4D; 
    font-family: inherit;
    font-size: 14px;
    line-height: 19.1px;
    &:last-of-type{
      font-family: inherit;
      font-size: 18px;
      line-height: 24.55px;
    }
  }
`
const HowWorkBox =styled.div`
  display: flex;
  justify-content: space-between;
  font-family: inherit;
  p{
    color: #4D4D4D; 
    span{
      text-transform: capitalize;
    }
    font-family: inherit;
    font-size: 16px;
    font-weight: 800;
    line-height: 21.82px;
  }
  svg{
    width: 20px;
  }
`
const IdentifyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    font-family:inherit ;
    font-size: 14px;
    font-weight: 600;
    color: #B2B2B2;
    line-height: 19.1px;
    text-transform: capitalize;
    &:last-of-type{
      color: #4D4D4D;
      font-family:inherit ;
      font-weight: 800;
      line-height: 19.1px;
    }
  }
`
export function PaymentTerm(){
  const {userInfo} =useValue();
  const {loading} = useLoading();
  console.log(userInfo)
  return(
    <PaymentTermBox>
      
      {loading.termBox ?
      <Loading/>
      :
      <>
        {userInfo?.termsValue && userInfo?.termsValue.map((num, index)=>(
          <TermBox
            key={index}>
            <CheckBox>
              <SelectBox
                $paid={userInfo.paidPix}
                $index={index}>
                  {checkIcon}
                </SelectBox>
              <Line
                index={userInfo?.termsValue? index===userInfo.termsValue.length-1:false}/>
            </CheckBox>
            <ValueBox>
              <p>{index+1}<span>a</span>&nbsp; {index===0?"entrada no Pix":"no cartão"}</p>
              <p>R$ {FormatMoney(num)}</p>
            </ValueBox>
          </TermBox>
        ))}
        <Divider/>
        <TaxBox>
          <p>CET: 0.5%</p> <p>Total: R$ {FormatMoney(userInfo?.totalValue ? userInfo?.totalValue: 0 )}</p>
        </TaxBox>
        <Divider/>
        <HowWorkBox>
          <p><span>como</span> funciona?</p>{arrowIcon}
        </HowWorkBox>
        <Divider/>
      </>
      }
        <IdentifyBox>
          <p>identificador:</p>
          <p>{userInfo?.identificatorBuy}</p>
        </IdentifyBox>
    </PaymentTermBox>
  )
}