import { useContext } from "react"
import { GlobalContext } from "."

export const useContextData=()=>{
    return useContext(GlobalContext)
}