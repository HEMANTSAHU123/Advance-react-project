import { createContext } from "react";

const notecontext=createContext({
    totalData:0,
    showing:0,
   name:"",
   desc:"",
userList:()=>{},
})
 export default notecontext;