import { createContext, useReducer } from "react";
import { initialState, reducer } from "./reducer";

export const GlobalContext=createContext()


const GlobalContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(reducer,initialState);
  return (
    <GlobalContext.Provider value={{state,dispatch}}>
        {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

