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
 const [update, setUpdate] = useState(false);
 const [input, setInput] = useState<TableRow>(defaultRow);
 const [error, setError] = useState<ErrorState>({name:"",error:""});
 const { countdown, start,reset,isRunning } = useCountdownTimer({timer: 1000 * 5,resetOnExpire:true});
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
 };


return (
    <div className="w-full h-full">
      {/* <div className="">
        {update?<TableHeader
            header={header}
            data={data}
            setData={setData}
            update={update}
          />:null}
      </div> */}
      
      <div className="w-full h-full">
     
        <table border={1} className="table-auto lg:table-fixed border-slate-600 h-full w-full">
          <thead className="p-5 w-screen sticky top-0">
            <tr>
              {header &&
                header.map((x, i) => {
                  return <th key={x.name + i}
                  className="p-[12px] bg-slate-400 border-slate-900 border align-middle text-center"
                  >{x.name}</th>;
                })}
              {update ? <th className="border-slate-900 border bg-slate-400">update</th> : null}
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
            {/* {singleFile &&
              singleFile.map((dataitem) => {
                return extraRow(
                  -23,
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
              })} */}
          </tbody>
        </table>

        {countdown!==5000? (
        <div className="rounded-lg">
          <UndoModal  undoRemove={undoRemove}countdown={countdown} />
        </div>
      ) : null}
      </div>

    </div>
);
}
