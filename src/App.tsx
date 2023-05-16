import { useContext } from 'react';
import { Sidebar } from "./components/ui"
import { TfiPencil } from 'react-icons/tfi';
import { SnippetContext } from "./context";
import { SnipperEditor } from "./components/snippets";

const App = () => {

  const { selectedSnippet,snippetsNames } = useContext( SnippetContext ); 

  return (
    <div className='h-screen  bg-slate-800 flex'>
      <aside>
        <Sidebar/>
      </aside>
      <main className="flex flex-col items-center w-full justify-center text-slate-300">
        {
          selectedSnippet
            ?(
              <SnipperEditor/>
            )
            :(
              <>
                <TfiPencil 
                  className='mt-2'
                  fontSize={100}
                />
                <h1 className="text-4xl font-semibold">Snippets-App</h1>
              </>
            )
        }
      </main>
    </div>
  )
}
export default App

