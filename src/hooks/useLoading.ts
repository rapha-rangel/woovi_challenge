import { LoadingContext } from "@/contexts/loading-context";
import { useContext } from "react";

export function useLoading(){
  return useContext(LoadingContext)
}