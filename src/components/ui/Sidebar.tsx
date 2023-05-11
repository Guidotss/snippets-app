import { useEffect, useState } from "react";
import { useSnippetsStore } from "../../store";
import { TypingEffect } from "./TypingEffect";

export const Sidebar = () => {
  const [snippetName, setSnippetName] = useState<string>("");
  const { addSnippetName,deleteSnippetName,snippetsNames,selectSnippet } = useSnippetsStore();

  const handleAddSnippet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (snippetName.trim().length === 0) return;
    addSnippetName(snippetName);
    setSnippetName("");
  };

  const handleDeleteSnippet = (snippetName: string) => {
    deleteSnippetName(snippetName);
  }

  return (
    <aside className="w-72 h-screen bg-slate-950 p-5">
      <div className="flex flex-col items-center justify-center h-28 border-b border-slate-900">
        <form className="flex flex-col" onSubmit={handleAddSnippet}>
          <input
            className="p-2 rounded-md bg-slate-700 text-slate-50 font-semibold"
            type="text"
            value={snippetName}
            onChange={(e) => setSnippetName(e.target.value)}
            placeholder="Bubble sort..."
          />
          <button
            className="p-1 bg-green-600 rounded-lg mt-2 hover:bg-green-700"
            type="submit"
          >
            <span className="text-slate-50">Agregar</span>
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <ul className="w-full">
          {snippetsNames.map((name:string, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 border-b border-slate-900 cursor-pointer"
              onClick={ () => selectSnippet(name)}
            >
              <TypingEffect text={name} />
              <button 
                className="p-1 bg-red-600 rounded-lg hover:bg-red-700"
                onClick={ () => handleDeleteSnippet(name) }
              >
                <span className="text-slate-50">Eliminar</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
