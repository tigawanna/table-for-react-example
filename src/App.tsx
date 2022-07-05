import DATA from './MOCK_TABLE.json'
import { useState } from 'react';
import { TheTable } from './components/TheTable/TheTable';
// import {TheTable } from 'table-for-react'

function App() {
  const [update, setUpdate] = useState(true);
  const [error, setError] = useState({name:"",error:""});

  const header = [
    {
      name: "ID",
      prop: "theid",
      type:"id"
    },
    {
      name: "Name",
      prop: "name",
      type:"string"
    },
    {
      name: "Age",
      prop: "age",
      type:"number"
    },
    {
      name: "Email",
      prop: "email",
      type:"string"
    },
    {
      name: "Date",
      prop: "date",
      type:"date"
    }
  ];

  const validate=(prev:any,current:any)=>{
   if(current.name!=="john"){
    setError({name:"name",error:"not john"})
     return false
   } 

   setError({name:"",error:""})
   return true
  }


  const saveChanges=(prev:any,current:any)=>{
  // console.log("saving ...",current)
  }
  
  const deleteRow=(current:any)=>{
  // console.log("delteing current ,",current)
  setError({name:"name",error:"not john"})
  }

  const clearError=()=>{
    setError({name:"",error:""})
    }

  return (
    <div className="w-screen h-screen ">
     <TheTable
     rows={DATA}
     error={error}
     update={update}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     header={header}
     clearError={clearError}
     />
    </div>
  );
}

export default App;
