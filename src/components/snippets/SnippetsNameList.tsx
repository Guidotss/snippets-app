import { useContext } from "react";
import { SnippetContext } from "../../context";
import { TypingEffect } from "../ui";
import { time } from "console";

export const SnippetsNameList = () => {
  const { snippetsNames, deleteSnippetName, selectSnippet } =
    useContext(SnippetContext);

  const handleDelete = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    deleteSnippetName(id);
  };

  const handleSelect = (snippetName: string, id: number) => {
    const snippet = {
      id,
      title: snippetName,
    };
    selectSnippet(snippet);
  };

  return (
    <ul className="mt-4">
      {snippetsNames.map((snippetName, id) => (
        <li
          key={id}
          className="flex justify-between items-center mr-2 bg-gray-800 text-white p-2 rounded-md cursor-pointer hover:bg-gray-700"
          onClick={() => handleSelect(snippetName, id)}
        >
          <TypingEffect text={snippetName} />
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-1"
            onClick={(event) => handleDelete(event, id)}
          >
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  );
};
