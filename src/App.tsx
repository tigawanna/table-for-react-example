import DATA from './MOCK_TABLE.json'
import { useState } from 'react';
import { TheTable } from './components/TheTable/TheTable';
// import {TheTable } from 'table-for-react'

const small_data =DATA.splice(0,2)
function App() {
  const [update, setUpdate] = useState(true);
  const [error, setError] = useState({name:"",error:""});

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
  //  if(current.name!=="john"){
  //   setError({name:"name",error:"not john"})
  //    return false
  //  } 

   setError({name:"",error:""})
   return true
  }


  const saveChanges=(prev:any,current:any)=>{
  console.log("saving ...",current,prev)
  }
  
  const deleteRow=(current:any)=>{
  // console.log("delteing current ,",current)
  setError({name:"name",error:"not john"})
  }

  const clearError=()=>{
    setError({name:"",error:""})
    }

  return (
    <div className="w-screen h-full overflow-y-hidden">
    <div className="p-[10%] bg-red-400 h-[40%]">top</div>
    <div className="absolute h-[60%] w-full z-40 bg-white">
     <TheTable
     rows={small_data}
     error={error}
     update={update}
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
