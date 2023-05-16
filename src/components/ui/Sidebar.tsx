import { SnippetContext } from '../../context';
import { SnippetForm, SnippetsNameList } from '../snippets';
import { useContext } from 'react';

export const Sidebar = () => {

  const { selectedSnippet,code, saveSnippet } = useContext( SnippetContext );  

  const handleSaveSnippet = () => {
    if( selectedSnippet && code ){
      saveSnippet({
        ...selectedSnippet,
        code
      });
    }
  }

  return (
    <div className="w-[240px] bg-slate-900 h-screen text-slate-50 flex flex-col overflow-y-auto scroll-bar">
        <div className="flex justify-center mt-2">
            <SnippetForm/>
        </div>

        <div className='ml-5 mt-2'>
            <SnippetsNameList/>
        </div>
        {selectedSnippet && (
          <div className='flex justify-center mt-2'>
            <button className='bg-green-500 hover:bg-green-600 absolute bottom-5 text-white font-bold py-2 px-4 rounded' onClick={ handleSaveSnippet }>
              Guardar Snippet
            </button>
          </div>
        )}
    </div>
  )
}
