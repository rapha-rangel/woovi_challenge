import styled from "@emotion/styled";
import { Select } from "./select";
import { ChangeEvent, useState } from "react";
import { Button } from "./button";
import { cardMask, cpfMask, cvvMask, venciMask } from "@/utils/input-masks";
import Input from "./input";
import { useValue } from "@/hooks/useValue";

interface InputesTypes {
  [key:string]:{
    value:string,
    erro: boolean,
    erroMessage: string
  }
};

const Form = styled.form`
  margin-top: 30px;
  width:424px;
  display: flex;
  flex-direction: column;
  gap: 28px;
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
const Line = styled.div`
  display: flex;
  gap:24px;
`
export function FormBox(){
  const {userInfo,setUserInfo} = useValue();
  const [inputs, setInputs] =useState<InputesTypes>({
    nome:{
      value:"",
      erro: false,
      erroMessage: "Campo Nome completo invalido"
    },
    cpf:{
      value:"",
      erro: false,
      erroMessage: "Campo CPF invalido"
    },
    cardNumber:{
      value:"",
      erro: false,
      erroMessage: "Campo Número do cartão invalido"
    },
    vencimento:{
      value:"",
      erro: false,
      erroMessage: "Campo Vencimento invalido"
    },
    cvv:{
      value:"",
      erro: false,
      erroMessage: "Campo CVV invalido"
    }
  })

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setInputs((prevState)=>({...prevState,
      [name]:{
      ...prevState[name], 
      value:value,
      erro: false
      },
    }));
  };

  const handleSubmit=( e: { preventDefault: () => void; })=>{
    e.preventDefault();
    const formFields = Object.keys(inputs);
    let newFormValues = {...inputs};
    const arrayErro=[{x:"nome"}, {x:"cpf", y:14}, 
      {x:"cardNumber", y:20}, {x:"vencimento", y:5}, {x:"cvv", y:3}];

    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = inputs[currentField].value;
      if(currentField ==="nome"){
        if(currentValue === ''){
          newFormValues = {
            ...newFormValues,
            [currentField]:{
              ...newFormValues[currentField],
              erro:true
            }
          }
        }
      } else if(currentField ===arrayErro[index].x){
        if(currentValue === ''|| currentValue.length !== arrayErro[index].y){
          newFormValues = {
            ...newFormValues,
            [currentField]:{
              ...newFormValues[currentField],
              erro:true
            }
          }
        }
      } 
    }
    setInputs(newFormValues);
    console.log(Object.values(newFormValues));
    const validate = Object.values(newFormValues).filter(obj=> obj.erro===false);
    console.log(validate)
    if(validate.length === 5){
      const values: {[key:string]:{x: string}}[] =  validate.reduce<any[]>((accumulator, currentValue, index) => {
        accumulator.push({[arrayErro[index].x]:currentValue.value});
        return accumulator;
      }, []);
      setUserInfo({...userInfo,"cardUser": values})
      console.log(userInfo, values)
    }
  }

  return(
    <Form
      onSubmit={handleSubmit}>
      <Input
        value={inputs.nome.value||""}
        handleChange={handleChange}
        label={"Nome completo"}
        name={"nome"}
        type={"text"}
        maxLength={50}
        error={inputs.nome.erro}
        helperText={inputs.nome.erro && inputs.nome.erroMessage}
      />
      <Input
        value={cpfMask(inputs.cpf.value)||""}
        handleChange={handleChange}
        label={"CPF"}
        name={"cpf"}
        type={"text"}
        maxLength={14}
        error={inputs.cpf.erro}
        helperText={inputs.cpf.erro && inputs.cpf.erroMessage}
      />
      <Input
        value={cardMask(inputs.cardNumber.value)||""}
        handleChange={handleChange}
        label={"Número do cartão"}
        name={"cardNumber"}
        type={"text"}
        maxLength={20}
        error={inputs.cardNumber.erro}
        helperText={inputs.cardNumber.erro && inputs.cardNumber.erroMessage}
      />
      <Line>
        <Input
          value={venciMask(inputs.vencimento.value)||""}
          handleChange={handleChange}
          label={"Vencimento"}
          name={"vencimento"}
          type={"text"}
          maxLength={5}
          error={inputs.vencimento.erro}
          helperText={inputs.vencimento.erro && inputs.vencimento.erroMessage}
        />
        <Input
          value={cvvMask(inputs.cvv.value)||""}
          handleChange={handleChange}
          label={"CVV"}
          name={"cvv"}
          type={"text"}
          maxLength={3}
          error={inputs.cvv.erro}
          helperText={inputs.cvv.erro && inputs.cvv.erroMessage}
        />
      </Line>
      <Select
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <Button
        type={"submit"} 
        handleClick={undefined} 
        click={false}>
          <Text>Pagar</Text>
      </Button>
    </Form>
  )
}