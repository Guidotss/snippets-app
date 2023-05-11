import { Sidebar } from "./components";
import { SnippetsEditor } from "./components/snippets";
import { useSnippetsStore } from "./store";
import { TfiPencil } from 'react-icons/tfi'

export default function App() {
  const { isSnippetOpen,snippetsNames } = useSnippetsStore();
  const snippets = snippetsNames.length > 0;
  

  return (
    <div className="w-full h-screen bg-slate-800 overflow-hidden flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex items-center justify-center">
        {
            isSnippetOpen && snippets
                ? <SnippetsEditor /> 
                :( 
                    <div className="absolute top-[40vh] left-[50vw] border-b p-2">
                        <TfiPencil className="text-9xl text-slate-400 ml-14" />
                        <h1 className="text-4xl text-slate-500">Select a snippet</h1>
                    </div>
                )
        }
      </div>
    </div>
  );
}
