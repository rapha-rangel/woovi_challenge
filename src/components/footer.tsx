'use client'
import styled from "@emotion/styled"
import FooterImg from "../assets/Group 6.png";


const FooterImage = styled.img`
  width: 269.52px;
  height: 22px;
  margin-top: 40px;
`

export function Footer() {
  return(
    <>
      <FooterImage src={FooterImg.src} alt="rodape Woovi"/>
    </>
  )
}