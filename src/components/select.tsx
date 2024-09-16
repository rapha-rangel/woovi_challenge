import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {arrowDownIcon} from "@/icons";
import { FormatMoney } from "@/utils/format-money";
import { FormatTerms } from "@/utils/format-terms";
import { useLoading } from "@/hooks/useLoading";
import {UserInfoTypes} from "@/types/user-info"

interface SelectProps {
  userInfo: UserInfoTypes
  setUserInfo:(value:UserInfoTypes)=> void
}

interface IconTagTypes {
  $changeselected: boolean
}
interface DropDownHeaderTypes{
  $open:boolean
}

const SelectBox =styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`
const Label= styled.label`
  position: absolute;
  top:-8px;
  left: 20px;
  background: white;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 19.1px;
  color: #4D4D4D;
  z-index:200 ;
`
const DropDownContainer = styled.div`
  width: 100%;
`
const DropDownHeader = styled.div<DropDownHeaderTypes>`
  width: 100%;
  position: relative;
  border: 2px solid;
  background: #FFFFFF;
  border-radius: 8px;
  padding: 20px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  line-height: 24.55px;
  color: #4D4D4D;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  border-color:${props=> props.$open?"#03D69D":"#E5E5E5" } ;
  &:hover{
    border-color: #03D69D;
  }
`
const DropDownListContainer = styled.div`
  position: relative;
`
const DropDownList = styled.ul`
  position: absolute;
  width: 100%;
  background: white;   
  border: 2px solid #E5E5E5;
  border-top: none;
  z-index: 10;
  top: -5px;
  &:hover{
    border-color: #03D69D;
  }
  &:last-child {
    border-radius:0px 0px 8px 8px ;
  }
`
const ListItem = styled.li`
  list-style: none;
  padding: 20px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  line-height: 24.55px;
  color: #4D4D4D;
  cursor: pointer;
  &:hover{
    background-color: #eeeded;
    color: black;
    &:last-child {
      border-radius:0px 0px 8px 8px ;
    }
  }
`
const IconTag = styled.div<IconTagTypes>`
  position: absolute;
  top: 50%;
  transform: translateY(-30%);
  right: 15px;
  font-size: 30px;
  color: #4D4D4D;
`

export function Select({userInfo, setUserInfo}: SelectProps) {
  const {loading,setLoading} = useLoading();
  const [selectArr, setSelectArr] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [changeSelected, setChangeSelected] = useState(false);

  useEffect(()=>{
    selectOptions(userInfo?.totalValue, userInfo?.termsValue)
  },[isOpen])

  const selectOptions=(total: number|undefined, value: number[]|undefined)=>{
    const newArr:number[]=[];
    var firstNum=0;
    if(value) firstNum= value[0];
    for(let i=0; i < 6 ; i++){
      var calc=0;
      if(total && value) calc =(total-firstNum)/(i+1);
      newArr.push(Math.round(calc * 100) / 100)
    }
    console.log(newArr)
    setSelectArr(newArr)
  }
  const handleSelect = (index: number)=>{
    setLoading({...loading, termBox: true})
    setUserInfo({...userInfo, termsValue:FormatTerms(userInfo?.termsValue, index, userInfo?.totalValue)})
    setIsOpen(false);
    setChangeSelected(true);
    setTimeout(()=>{
      setLoading({...loading, termBox: false})
    }, 1000)
  }

  return(
    <SelectBox>
      <Label>Parcelas</Label>
      <DropDownContainer >
        <DropDownHeader
          $open={isOpen}
          onClick={() => setIsOpen(prev=> !prev)}>
            {userInfo?.termsValue?`${userInfo.termsValue.length-1}x de R$ ${FormatMoney(userInfo?.termsValue[1])}`:null}
            <IconTag  $changeselected={changeSelected}>{arrowDownIcon}</IconTag>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {selectArr && selectArr?.map((option:number, index:number)=>(
                <ListItem
                  key={index}
                  onClick={()=>handleSelect(index)}>
                  {index+1}x de R$ {FormatMoney(option)}
                </ListItem>
              ))}
            </DropDownList>
        </DropDownListContainer>
        )}
      </DropDownContainer>
    </SelectBox>
  )
}