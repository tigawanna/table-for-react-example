import DATA from './MOCK_TABLE.json'
import { useState } from 'react';
// import { TheTable } from './components/TheTable/TheTable';
import {TheTable } from 'table-for-react'



function App() {

  const [error, setError] = useState({name:"",error:""});

  const small_data =DATA
  //  console.log("limit === ",limit)
  const header = [
    {
      name: "ID",
      prop: "theid",
      type:"id",
      editable:true
    },
    {
      name: "Name",
      prop: "name",
      type:"string",
      editable:true
    },
    {
      name: "Age",
      prop: "age",
      type:"number",
      editable:true
    },
    {
      name: "Email",
      prop: "email",
      type:"string",
      editable:true
    },
    {
      name: "Date",
      prop: "date",
      type:"date",
      editable:false
    }
  ];

  const validate=(prev:any,current:any)=>{
   if(current.name.toLowerCase() ==="deeznuts" || current.name.toLowerCase() ==="deez nuts"){
    setError({name:"name",error:"behave"})
     return false
   } 
   if(current.age<0){
    setError({name:"age",error:"must be positive"})
     return false
   } 
   if(current.age>150){
    setError({name:"age",error:"okey dracula, real age now"})
     return false
   } 
   setError({name:"",error:""})
   return true
  }


  const saveChanges=(prev:any,current:any)=>{
  // console.log("saving ...",current,prev)
  }
  
  const deleteRow=(current:any)=>{
  // console.log("delteing current ,",current)
  setError({name:"name",error:"not john"})
  }

  const clearError=()=>{
    setError({name:"",error:""})
    }

  // console.log("rows being passed into the table === ",small_data)
  return (
    <div className="w-full h-full overflow-y-hidden">

    {/* <div className="p-[10%] bg-red-400 h-[40%]">top</div> */}
    <div className="absolute  w-full z-40 bg-white">
     <TheTable
     rows={small_data}
     error={error}
     sort={true}
     update={true}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     header={header}
     clearError={clearError}
     />
     </div>
    </div>
  );
}

export default App;
