import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

import { writeTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetsStore } from "../../store";

export const SnippetsEditor = () => {
  const { snippets } = useSnippetsStore();
  console.log(snippets);
  const [ code, setCode ] = useState<string | undefined>(""); 


  useEffect(() => {
    const saveFile = async () => {
      const path = `${await desktopDir()}/snippets-app/snippets`;
      const file = {
        id: snippets[0].id,
        title: snippets[0].title,
        code: code,
      }

      await writeTextFile(`${path}/${snippets[0].id}.json`, `${JSON.stringify(file, null, 2)}`)
    }
    saveFile();
  }, [code])
      

  return (
    <div className="w-full h-screen bg-slate-800 overflow-y-hidden">
      <div className="w-full h-full">
        <Editor
          onChange={(value) => setCode(value)}
          height="100%"
          width={window.innerWidth}
          defaultLanguage="javascript"
          theme="vs-dark"
          options={{
            fontSize: 20,
          }}
        />
      </div>
    </div>
  );
};
