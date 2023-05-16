import { useState, useContext } from "react";
import { SnippetContext } from "../../context/SnippetContext";

export const SnippetForm = () => {
  const [snippetName, setSnippetName] = useState<string>("");
  const { addSnippetName } = useContext(SnippetContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!snippetName) return;

    addSnippetName(snippetName);
    setSnippetName("");
  };

  return (
    <form className="flex flex-col mt-4" onSubmit={handleSubmit}>
      <input
        className=" p-1 rounded-md bg-slate-800 text-slate-50 px-2"
        type="text"
        placeholder="Bubble sort..."
        name="snippetName"
        value={snippetName}
        onChange={(e) => setSnippetName(e.target.value)}
      />
      <button className="bg-green-600 rounded-lg mt-2 p-1 hover:bg-green-800 hover:text-slate-400">
        <span className="font-light">Agregar snippet</span>
      </button>
    </form>
  );
};
