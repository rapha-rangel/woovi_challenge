'use client'
import styled from "@emotion/styled";
import LogoTitle from "../assets/Logo.png"

const ImageTitle = styled.img`
  width:123.51px;
  height: 36.65px;
`

export function Header() {
  return(
    <ImageTitle src={LogoTitle.src} alt="logo woovi"/>
  )
}