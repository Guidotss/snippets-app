import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";

import { writeTextFile,readTextFile } from "@tauri-apps/api/fs";
import { desktopDir } from "@tauri-apps/api/path";
import { useSnippetsStore } from "../../store";

export const SnippetsEditor = () => {
  const [ code, setCode ] = useState<string | undefined>("");
  const { selectedSnippet ,saveSnippet, lastSnippetName } = useSnippetsStore();
  const editorRef = useRef<any>(null);
  
  const handdleDidMount = (editor:any, monaco:any) => {
    editorRef.current = editor;
  }

  useEffect(() => {
    
    if(selectedSnippet) {
      setCode(selectedSnippet.code);
    }

  },[selectedSnippet])


  const handleSaveSnippet = async () => {
    const editor = editorRef.current;
    const value = editor.getValue();
    const snippet = {
      id: lastSnippetName,
      title: lastSnippetName,
      code: value,
    }

    const path = `${await desktopDir()}/snippets-app/snippets`;
    await writeTextFile(`${path}/${snippet.title}.json`, `${JSON.stringify(snippet,null,2)}`);
    saveSnippet(snippet);
    console.log(snippet)
  }

  return (
    <div className="w-full h-screen bg-slate-800 overflow-y-hidden">
      <div className="flex justify-center shadow-xl">
        <h1 className="text-slate-50 text-3xl p-2">Snippet Editor</h1>
        <button 
          className="bg-green-600 rounded-lg px-2 py-1 m-2"
          onClick={ handleSaveSnippet }
        >
        <span className="text-slate-50">Save Snippet</span>
      </button>
      </div>
      <div className="w-full h-full">
        <Editor
          onMount={ handdleDidMount }
          defaultValue={ code }
          value={ code }
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
