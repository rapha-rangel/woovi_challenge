import { ValueContext } from "@/contexts/values-context";
import { useContext } from "react";

export function useValue(){
  return useContext(ValueContext)
}