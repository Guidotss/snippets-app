import { useContext } from "react";
import { SnippetContext } from "../../context";
import { TypingEffect } from "../ui";


export const SnippetsNameList = () => {
  const { snippetsNames, deleteSnippetName,selectSnippet } = useContext(SnippetContext);

  const handleDelete = ( event:React.MouseEvent,id: number ) => {
    event.stopPropagation();
    deleteSnippetName( id ); 
  }

  const handleSelect = ( snippetName:string, id:number ) => {
    const snippet = { 
      id,
      title: snippetName,
    }
    selectSnippet( snippet );
  }


  return (
    <ul className="mt-4">
      {snippetsNames.map((snippetName: string, index: number) => (
        <li key={index} className="flex justify-between items-center mt-2 cursor-pointer" onClick={() =>  handleSelect(snippetName, index)}>
          <TypingEffect text={snippetName} />
          <button className="bg-red-500 mr-2 p-1 rounded-lg hover:bg-red-600" onClick={( event ) =>  handleDelete ( event,index )}>
            <span className="text-sm font-light">Eliminar</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
