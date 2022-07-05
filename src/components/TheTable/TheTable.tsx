import React,{useState} from 'react'


import { useCountdownTimer } from 'use-countdown-timer';
import { mainRow } from '../tableparts/tableRows';
import { UndoModal } from '../tableparts/UndoModal';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';

interface TheTableProps {
rows:any[]
error:{name:string,error:string}
update:boolean
header:{name:string,prop:string,type:string}[]
validate: (prev: any, current: any) => boolean
saveChanges: (prev: any, current: any) => void
deleteRow: (current: any) => void
clearError: () => void
}

export const TheTable: React.FC<TheTableProps> = (
  {
  rows,
  error,
  update,
  header,
  validate,
  saveChanges,
  deleteRow,
  clearError
}
  ) => {


const [data, setData] = useState<any>(rows);
const [editIdx, setEditIdx] = useState(-1);
const [before, setBefore] = useState<any>({});
const [input, setInput] = useState<any>();

const { countdown, start,reset} = useCountdownTimer({timer: 1000 * 5,resetOnExpire:true});


const handleSortAsc = (field:any) => {
  function compare(a:any, b:any) {
    if (typeof a === "number") {
      //@ts-ignore
      return a[field] - b[field];
    } else {
      if (a[field] > b[field]) {
        return 1;
      }
      if (b[field] > a[field]) {
        return -1;
      }
      return 0;
    }
  }
  const sorted = data.sort(compare);
  setData([...sorted]);
};
const handleSortDesc = (field:any) => {
  function compare(a:any, b:any) {
    if (typeof a === "number") {
        //@ts-ignore
      return b[field] - a[field];
    } else {
      if (b[field] > a[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    }
  }

  const sorted = data.sort(compare);
  setData([...sorted]);
};

 //@ts-ignore
 const handleChange = (e, item) => {
   const { value } = e.target;

   setInput({
     ...input,
     [e.target.id]: value

   });
 };

 //convert row from td cell to input to start editing
 const startEditing = (index: number) => {
   if (index === -23) {
     setEditIdx(-23);
   } else {
     setEditIdx(index);
   }
//copy the row selected to before to compare to changes in input
 data?.map((row:any, j:number) => (j === index ? setBefore(row) : row));
 data?.map((row:any, j:number) => (j === index ? setInput(row) : row));

};

 const removeItem = (index: number) => {
   if (index === -69) {
     setEditIdx(-1);
   } else {
     setEditIdx(-1);
     deleteRow(input)
     clearError()
     data?.splice(index, 1);
     start()
   }
 };
 //restore item to the top of the list
 const undoRemove = () => {
   reset()
   data?.unshift(input);
 };

 //save the edits to db
 const stopEditing = async (index: number) => {
    if(validate(before,input)){
     data?.splice(index, 1,input);
    setEditIdx(-1);
    saveChanges(before,input)
   
   }
 }

    //save the edits to db
 const cancelEdit =  (index: number) => {

   if (index === -69) {
      setEditIdx(-1);
      clearError()
    } else {
      setEditIdx(-1);
      clearError()
    }

 };


return (
    <div className="w-full h-full">
  <div className="w-full h-full overflow-x-scroll lg:overflow-x-hidden">
        <table border={1} className="table-auto  h-full w-full">
          <thead className="p-5 w-screen sticky top-0 h-16">
          <IconContext.Provider
            value={{ size: "20px",className:"text-white m-0 p-0 flex-center hover:bg-purple-700 hover:rounded-sm"  }}
          >
        <tr>
              {header &&
                header.map((x, i) => {
                  return <td key={x.name + i}
                  className="bg-slate-900 p-2 text-white  border"
                  >
                <div className="flex justify-center items-center w-full bg-slate-900 h-full">
                  <div className="flex font-semibold">{x.name}</div>
                      <div className="flex flex-col ml-1 h-[60%] ">
                        <FaSortUp onClick={() => handleSortAsc(x.prop)}/>
                        <FaSortDown onClick={() => handleSortDesc(x.prop)} />
                      </div>
                  </div>
              
                  </td>;
                })}
              {update ? <th className=" bg-slate-900 text-white opacity-100">Edit</th> : null}
            </tr>
            </IconContext.Provider>
          </thead>
          <tbody className="">
            {data &&
              data.map((dataitem:Object, dataindex:number) => {
                return mainRow(
                  dataindex,
                  dataitem,
                  header,
                  handleChange,
                  editIdx,
                  startEditing,
                  stopEditing,
                  removeItem,
                  cancelEdit,
                  input,
                  update,
                  error
                );
              })}
   
          </tbody>
        </table>
         {/* undo butto to restore removed row after edit */}
        {countdown!==5000? (
        <div className="fixed bottom-[10%] right-[10%] rounded-lg w-24 p-2  font-medium 
        hover:bg-purple-800 bg-slate-900">
          <UndoModal  undoRemove={undoRemove} countdown={countdown} />
        </div>
      ) : null}
      </div>

    </div>
);
}
