import { SnippetForm, SnippetsNameList } from '../snippets';

export const Sidebar = () => {

  return (
    <div className="w-[240px] bg-slate-900 h-screen text-slate-50 flex flex-col overflow-y-auto scroll-bar">
        <div className="flex justify-center mt-2">
            <SnippetForm/>
        </div>

        <div className='ml-5 mt-2'>
            <SnippetsNameList/>
        </div>
    </div>
  )
}
