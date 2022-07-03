import {
    FaRegEdit,
    FaRegTrashAlt,
    FaRegCheckCircle,
    FaRegWindowClose,
  } from "react-icons/fa";

  import { IconContext } from "react-icons/lib";
import { ErrorState} from "../TheTable/utils/types";
import { tymeToDate } from './../TheTable/utils/utils';
import { Tyme } from './../TheTable/utils/types';


  
  
 export const mainRow = (
    index: number,
    item: any,
    header: { name: string; prop: string }[],
    handleChange: any,
    editIdx: number,
    startEditing: (index: number, item: any) => void,
    stopEditing: (index: number, item: any) => void,
    removeItem: (index: number, item: any) => void,
    input: any,
    update: boolean,
    error: ErrorState | undefined
  ) => {

  //transform <td> data here before it's mapped to the table, remember no obects allowwed as react children
  const mapToCurrent = (
    prop: string | number,
    item: any
  ): string | number => {
  
  //checking for firebase timestamp object to civert it to date
  if(prop==="date" && (item[prop] as Tyme).seconds){
   return tymeToDate(item[prop] as Tyme)
  }

  //@ts-ignore
  return item[prop];
  };


 const currentlyEditing = editIdx === index;
    return (
      <tr key={item.id} className="">
      {/* table cell */}
      {header.map((head, index) => {
        return (
          <td
          className="border-slate-800 border-2 text-center p-1 overflow-hidden text-sm font-medium"
            key={
              //@ts-ignore
              head.prop + item[head.prop]
            }
          >
            {currentlyEditing ? (
              <div>
                <input
                  className="w-full border-red-900 border-2 text-center"
                  id={head.prop}
                  name={head.prop}
                  onChange={(e) => handleChange(e, head.prop, index)}
                  value={
                    //@ts-ignore
                    input[head.prop]
                  }
                />
                {error && error.name !=="" && error.name === head.prop ? (
                  <div className="text-red-300 text-sm ">{error.error}</div>
                ) : null}
              </div>
            ) : (
              //@ts-ignore
              <div>{mapToCurrent(head.prop, item)}</div>
            )}
          </td>
        );
      })}

      {update ? (
        <td className="border-slate-800 border-2 p-1">
          <IconContext.Provider
            value={{ size: "20px",className:"mx-[2px] opacity-50 hover:opacity-100"  }}
          >
            <div className=" w-full  flex justify-center items-center">
            {currentlyEditing ? (
              <FaRegCheckCircle onClick={() => stopEditing(index, item)} />
            ) : (
              <FaRegEdit onClick={() => startEditing(index, item)} />
            )}
            {currentlyEditing ? (
              <FaRegTrashAlt onClick={() => removeItem(index, item)} />
            ) : null}
            {currentlyEditing ? (
              <FaRegWindowClose
                onClick={() => removeItem((index = -69), item)}
              />
            ) : null}
            </div>
          </IconContext.Provider>
        </td>
      ) : null}



      </tr>
      
      )

     
  };
  
 
  