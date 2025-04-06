import React, { useState } from 'react'
import notecontext from './Context'
const Contextprovider = (props) => {
 const[total,setTotal]=useState(0);
const[showing,setShowing]=useState(0);
 const[userList,setUserList]=useState([])

 
 const searchNote=(searchTerm)=>{
    const filteredList = userList.filter(
      (note) =>
        note.name.toLowerCase().includes(searchTerm)||
      note.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  setShowing(filteredList.length)
  return filteredList
   }
 
  return (
    <notecontext.Provider value={{
total,setTotal,showing,setShowing,userList,setUserList,searchNote
    }}>
      {props.children}
    </notecontext.Provider>
  )
}

export default Contextprovider
