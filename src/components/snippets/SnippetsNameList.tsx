import { useContext } from "react";
import { SnippetContext } from "../../context";
import { TypingEffect } from "../ui";


export const SnippetsNameList = () => {
  const { snippetsNames } = useContext(SnippetContext);

  return (
    <ul className="mt-4">
      {snippetsNames.map((snippetName: string, index: number) => (
        <li key={index} className="flex justify-between items-center mt-2">
          <TypingEffect text={snippetName} />
          <button className="bg-red-500 mr-2 p-1 rounded-lg hover:bg-red-600">
            <span className="text-sm font-light">Eliminar</span>
          </button>
        </li>
      ))}
    </ul>
  );
};
