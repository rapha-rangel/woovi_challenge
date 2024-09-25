import styled from "@emotion/styled";
import { Ribbon } from "./ribbon";
import {checkIcon} from "@/icons/index";
import { useRouter } from "next/navigation";
import { FormatMoney } from "@/utils/format-money";
import { useValue } from "@/hooks/useValue";
import axios from "axios";


interface CardProps {
  setSelect:(value: number)=>void
  select: number
  values: {
    valor: number
    total: number
  }
  index: number
  pixText: string
  textRibbon:{
    boldText: string
    text: string
  }
}
interface CardBoxTypes {
  $index: number
  $select: boolean
}
interface ElementTypes {
  $index: number
}
interface SelectTypes {
  $select: boolean
}
const CardBox = styled.div<CardBoxTypes>`
  border: 2px solid;
  border-color: ${props=> props.$select? "#03D69D": "#E5E5E5"};
  outline: 2px solid ;
  outline-color: ${props=> props.$select? "#03D69D": "transparent"};
  outline-offset: -2px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 14px 20px;
  gap: 17px;
  width: 429px;
  border-top: 1px solid #E5E5E5;
  border-bottom:${props => props.$index ===-1? "2px solid #E5E5E5": "1px solid #E5E5E5"};
  background-color: ${props=> props.$select? "#F4FBF9": "white"};
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:first-of-type{
    padding-top: 28px;
    border-radius:${props => props.$index ===-1? "10px": "10px 10px 0 0 "} ;
    border-top: 2px solid #E5E5E5;
    margin-top: 34px;

  }
  &:last-of-type{
    border-radius: 0 0 10px 10px;
    border-bottom: 2px solid #E5E5E5;
  }
  &:hover{
    outline-color: #03D69D;
  }
`
const Element = styled.div<ElementTypes>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width:${props => props.$index ===-1? "67px": "157px"} ;
  height: 27px;
  left: 21px;
  top:-14px;
  border-radius: 100px;
  background-color: #E5E5E5;
  p{
    font-family: inherit;
    font-size: 18px;
    font-weight: 800;
    line-height: 24px;
  }
`
const Title = styled.h4`
  font-family: inherit;
  font-size: 24px;
  font-weight: 600;
  line-height: 32.74px;
  span{
    font-family: inherit;
    font-size: 24px;
    font-weight: 800;
  }
`
const SubTitle = styled.p`
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 21.82px;
  color: #AFAFAF;
`
const SelectBox = styled.div<SelectTypes>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props=> props.$select?"#03D69D":"white"};
  right: 20px;
  top:20px;
  width: 26px;
  height: 26px;
  gap: 0px;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${props=> props.$select? "#03D69D": "#E5E5E5"};
  transition: all 0.5s cubic-bezier(0.23, 1, 0.320, 1);
  svg{
    color:white;
    font-size: 11px;
    display:${props=> props.$select?"flex":"none"} ;
  }
`

export function Card ({values, index, pixText, textRibbon, select, setSelect}: CardProps){
  const {userInfo} = useValue();
  const router = useRouter();
  const idBuyGenerate ="2c1b951f356c4680b13ba1c9fc889c47";

  const handleClick= async(index: number, values:{valor: number, total: number})=>{
    const termsValue = Array(index>=0?index+1: index+2).fill(values.valor);

    console.log(termsValue)
    const idSearch = await axios.get(`https://json-server-woovi-db.vercel.app/users?userName=${userInfo.userName}`);
    console.log(idSearch)
    if(idSearch.data.length>0){
      try{
        await axios.put(`https://json-server-woovi-db.vercel.app/users/${userInfo.id}`,{
          identificatorBuy:idBuyGenerate,
          userName: userInfo?.userName,
          totalValue:values.total,
          termsValue,
          paidPix: false
        });
        setSelect(index);
        setTimeout(()=>{
          router.push(`/pixPayment?idBuy=${idBuyGenerate}`);
        },1000)
      }catch(err){
        console.log(err)
      }
    }
  }

  return(
    <CardBox
      onClick={()=>handleClick(index, values)}
      $select={select===index}
      $index={index}>
        {index===1||index===-1?
        <Element
          $index={index}>
        <p>{pixText}</p>
      </Element>
      :null
        }
        <div>
          <Title><span>{index===-1?1: Number(index)+1}x</span> R$ {FormatMoney(values.valor)}</Title>
          <SubTitle>Total: R$ {FormatMoney(values.total)}</SubTitle>
        </div>
        {index ===3|| index===-1 ? 
          <Ribbon
            textRibbon={textRibbon}/>
        :null}
      <SelectBox
        $select={select===index}>
        {checkIcon}
      </SelectBox>
    </CardBox>
  )
}