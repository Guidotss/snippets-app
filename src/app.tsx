import { useEffect } from "react";
import { TfiPencil } from "react-icons/tfi";
import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { Sidebar } from "./components";
import { SnippetsEditor } from "./components/snippets";
import { Snippet, useSnippetsStore } from "./store";

export default function App() {
  const { isSnippetOpen, snippetsNames, setSnippets } = useSnippetsStore();
  const snippets = snippetsNames.length > 0;

  useEffect(() => {
    getSnippets()
    
  }, []);

  const getSnippets = async () => {
    const dir = `${await desktopDir()}/snippets-app/snippets`;
    const files = await readDir(dir);

    if (files.length <= 1) return;

    const filesNames = files.map(async (file) => {
      if (file.name === ".gitkeep") return;
      const fileContent = await readTextFile(`${dir}/${file.name}`);
      const fileName = file.name?.split(".")[0];
      

      return {
        id: fileName,
        title: fileName,
        code: JSON.parse(fileContent).code
      };
    });
    const snippets = await Promise.all(filesNames);
    setSnippets(snippets.filter(Boolean) as Snippet[]); 
  };

  return (
    <div className="w-full h-screen bg-slate-800 overflow-hidden flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex items-center justify-center">
        {isSnippetOpen && snippets ? (
          <SnippetsEditor />
        ) : (
          <div className="absolute top-[40vh] left-[50vw] border-b p-2">
            <TfiPencil className="text-9xl text-slate-400 ml-14" />
            <h1 className="text-4xl text-slate-500">Select a snippet</h1>
          </div>
        )}
      </div>
    </div>
  );
}
