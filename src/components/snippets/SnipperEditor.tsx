import { Editor } from '@monaco-editor/react';
import { useRef, useContext } from 'react';
import { SnippetContext } from '../../context';

export const SnipperEditor = () => {

    const { setCode } = useContext( SnippetContext )

    const editorRef = useRef<any>(null);

    const handleEditorDidMount = (editor: any, monaco: any) => {
        editorRef.current = editor;
        editor.focus();
    }

  return (
    <div className="w-full h-full">
        <Editor
            height="100%"
            defaultLanguage='javascript'
            onMount={ handleEditorDidMount }
            theme='vs-dark'
            options={{
                fontSize: 20,
            }}
            onChange={ (value) => setCode(value as string) }

        />
    </div>
  )
}