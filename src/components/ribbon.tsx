import styled from "@emotion/styled";

interface RibbonProps{
  textRibbon:{
    boldText: string
    text: string
  }
  
}
const RibbonBox = styled.div`
  display: flex;
  position: relative;
  width: 99%;
  padding: 7px 10px;
  border-radius:5px ;
  background: #133A6F;
  &:after{
    content: '';
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    border-style: solid;
    border-width: 15px 15px 15px 0;
    border-color: transparent white transparent transparent;
  }
`
const Title = styled.h4`
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  color: white;
  span{
    font-family: inherit;
    font-size: 16px;
    font-weight: 800;
    line-height: 20px;
  }

`
export function Ribbon({textRibbon}:RibbonProps) {
  return(
    <RibbonBox><Title><span>{textRibbon.boldText}</span>{textRibbon.text}</Title></RibbonBox>
  )
}