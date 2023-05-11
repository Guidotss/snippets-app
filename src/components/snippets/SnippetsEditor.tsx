import { useRef } from 'react';
import { Editor } from '@monaco-editor/react';


export const SnippetsEditor = () => {

    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        editorRef.current.focus();
    }

    

  return (
    <div className="w-full h-screen bg-slate-800 overflow-y-hidden">
        <div className="w-full h-full">
            <Editor
                height="100%"
                width={window.innerWidth}
                defaultLanguage="javascript"
                theme='vs-dark'
                options={{
                    fontSize: 20,
                }}
                onMount={handleEditorDidMount}
            />
        </div>
    </div>
  )
}