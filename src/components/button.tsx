import styled from "@emotion/styled";
import {MouseEventHandler, ReactNode} from "react";

interface ButtonProps  {
  children: ReactNode|undefined
  type: "button" | "submit" |undefined
  handleClick:  MouseEventHandler<HTMLButtonElement> |undefined
  click: boolean
}

interface ButtonTypes {
  $click: boolean
}

export function Button({children, type, handleClick, click}: ButtonProps ){

  const Button= styled.button<ButtonTypes>`
  width: 100%;
  padding: 7px;
  border: none;
  outline:${props => props.$click ? "3px solid #03D69D": "none"} ;
  border-radius: 8px;
  background-color: #133A6F;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family:inherit ;
  cursor: pointer;
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
`

  return(
    <Button
      $click={click}
      type={type}
      onClick={handleClick}>
          {children}
      </Button>
  )
}