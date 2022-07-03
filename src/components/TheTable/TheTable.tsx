import React,{useState} from 'react'
import { TableRow,ErrorState } from './utils/types';
import DATA from './utils/MOCK_TABLE.json'
import { useCountdownTimer } from 'use-countdown-timer';
import { header } from './utils/vars';
import { mainRow } from '../tableparts/tableRows';
import { UndoModal } from '../tableparts/UndoModal';

interface TheTableProps {

}

export const TheTable: React.FC<TheTableProps> = ({}) => {
const defaultRow={ id:0,name:"name",age:0 ,email:"@email",date:"today"}

const [data, setData] = useState<TableRow[]>(DATA);
const [editIdx, setEditIdx] = useState(-1);
 const [before, setBefore] = useState<TableRow>(defaultRow);
 const [update, setUpdate] = useState(true);
 const [input, setInput] = useState<TableRow>(defaultRow);
 const [error, setError] = useState<ErrorState>({name:"",error:""});
 const { countdown, start,reset,isRunning } = useCountdownTimer({timer: 1000 * 5,resetOnExpire:true});

 console.log(countdown)
 //@ts-ignore
 const handleChange = (e, vals, item) => {
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

//  data?.map((row, j) => (j === index ? setBefore(row) : row));
//  data?.map((row, j) => (j === index ? setInput(row) : row));

};

 const removeItem = (index: number) => {
   if (index === -69) {
     setEditIdx(-1);
   } else {
     setEditIdx(-1);
  
     //no(index);
     // data?.splice(index, 1);
   }
 };
 //restore item to the top of the list
 const undoRemove = () => {
   reset()
   data?.unshift(input);
 };

 //save the edits to db
 const stopEditing = async (index: number) => {
   console.log("saving ", index)
   start()
  //  if(index!==9){
  //   setError({name:"date",error:"deeznuts"})
  //  }
 };


return (
    <div className="w-full h-full">
  <div className="w-full h-full overflow-x-scroll lg:overflow-x-hidden">
        <table border={1} className="table-auto lg:table-fixed border-slate-600 h-full w-full">
          <thead className="p-5 w-screen sticky top-0">
            <tr>
              {header &&
                header.map((x, i) => {
                  return <th key={x.name + i}
                  className="p-[12px] bg-slate-900 border-slate-900 border align-middle text-center"
                  >{x.name}</th>;
                })}
              {update ? <th className=" bg-slate-900 opacity-100 ">Edit</th> : null}
            </tr>
          </thead>
          <tbody className="border-slate-800 border-2">
            {data &&
              data.map((dataitem, dataindex) => {
                return mainRow(
                  dataindex,
                  dataitem,
                  header,
                  handleChange,
                  editIdx,
                  startEditing,
                  stopEditing,
                  removeItem,
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
