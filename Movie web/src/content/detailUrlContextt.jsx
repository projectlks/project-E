import { createContext } from "react";
import Detail from "../pages/detial";

const DetailUrlContext = createContext()
const DetailUrlContextProvider = ({children}) =>
{
return (<DetailUrlContext.Provider value={{url : 'link'}}>
{children}
</DetailUrlContext.Provider>)}