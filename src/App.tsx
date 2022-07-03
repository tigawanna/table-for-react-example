import { TheTable } from "./components/TheTable/TheTable";
import DATA from './MOCK_TABLE.json'
import { useState } from 'react';
import { header } from './components/TheTable/utils/vars';
import { ErrorState } from "./components/TheTable/utils/types";


function App() {
  const [update, setUpdate] = useState(true);
  const [error, setError] = useState<ErrorState>({name:"",error:""});

  const validate=(prev:any,current:any)=>{
   if(current.name!=="john"){
    setError({name:"name",error:"not john"})
     return false
   } 

   setError({name:"",error:""})
   return true
  }
  const saveChanges=(prev:any,current:any)=>{
  console.log("saving ...",current)
  }
  const deleteRow=(current:any)=>{
  console.log("delteing current ,",current)
  }


  return (
    <div className="w-screen h-screen bg-slate-700">
     <TheTable
     rows={DATA}
     error={error}
     update={update}
     validate={validate}
     saveChanges={saveChanges}
     deleteRow={deleteRow}
     header={header}
     />
    </div>
  );
}

export default App;
