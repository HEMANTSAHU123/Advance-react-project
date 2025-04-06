import React, { useState } from 'react'
import notecontext from './Context'
const Contextprovider = (props) => {
 const[total,setTotal]=useState(0);
const[showing,setShowing]=useState(0);
 const[userList,setUserList]=useState([])

 const addNote=(note)=>{
    const newList={...note,id:Date.now()}
    setUserList((prevlist)=>[...prevlist,newList])
    setShowing((prev)=>prev+1);
    setTotal((prev)=>prev+1)
 }
 const searchNote=(searchTerm)=>{
    const filteredList = userList.filter(
      (note) =>
        note.name.toLowerCase().includes(searchTerm)||
      note.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  setShowing(filteredList.length)
  return filteredList
   }
 const deleteNote=(id)=>{
    setUserList((prevList)=>prevList.filter((note)=>note.id!==id))
    setShowing((prev)=>prev-1);
    setTotal((prev)=>prev-1);
 }
  return (
    <notecontext.Provider value={{
addNote,deleteNote,total,setTotal,showing,setShowing,userList,setUserList,searchNote
    }}>
      {props.children}
    </notecontext.Provider>
  )
}

export default Contextprovider
