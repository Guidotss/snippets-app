import { FC, useReducer, useEffect } from 'react';
import { SnippetContext, snippetReducer } from ".";
import { Snippet } from "../interfaces";
import { writeTextFile, removeFile, readTextFile, readDir, FileEntry } from '@tauri-apps/api/fs'; 
import { desktopDir } from '@tauri-apps/api/path';



interface SnippetProviderProps {
  children: React.ReactNode;
}

export interface SnippetState {
  snippetName: string;
  snippetsNames: string[];
  selectedSnippet?: Snippet ;
  code?: string; 
}

const SNIPPETS_INITIAL_STATE: SnippetState = {
  
  snippetName: "",
  snippetsNames: [],
  selectedSnippet: undefined,
  code: undefined
};

export const SnippetProvider: FC<SnippetProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer( snippetReducer, SNIPPETS_INITIAL_STATE);


  useEffect(() => {
    readFiles();
  },[]); 


  const readFiles = async () => {
    const aplicationPath = `${await desktopDir()}/snippets-app/snippets`;
    const files = await readDir( aplicationPath );
    const filesNames = files.filter(files => files.name?.endsWith('.json')); 
    
    const snippets = await Promise.all( filesNames.map( async (file) => {
      const snippet = await readTextFile(`${aplicationPath}/${file.name}`);
      return {
        title: file,
        code: JSON.parse(snippet).code
      }as { title: FileEntry, code: string }
    })); 
    
    dispatch({
      type: '[Snippets] - loadFiles',
      payload: snippets
    }); 
    
  }

  const addSnippetName = async( snippetName: string ) => {
    const aplicationPath = `${await desktopDir()}/snippets-app/snippets`;
    await writeTextFile( `${aplicationPath}/${snippetName}.json`, '{}');

    dispatch({
      type: '[Snippets] - addSnippet',
      payload: snippetName
    })
  }

  const deleteSnippetName = async( id: number ) => {

    const aplicationPath = `${await desktopDir()}/snippets-app/snippets`;
    const snippetCode = (await readDir(`${aplicationPath}`)).filter( file => file.name === `${state.snippetsNames[id]}.json` );

    await removeFile(`${aplicationPath}/${snippetCode[0].name}`);

    dispatch({
      type: '[Snippets] - deleteSnippet',
      payload: id
    }); 
  }


  const selectSnippet = async ( snippet:Snippet ) => {

    const aplicationPath = `${await desktopDir()}/snippets-app/snippets`;
    const snippetCode = (await readDir(`${aplicationPath}`)).filter( file => file.name === `${snippet.title}.json` );
    const code = await readTextFile(`${aplicationPath}/${snippetCode[0].name}`);

    const snippetSelected = {
      id: state.snippetsNames.indexOf(snippet.title),
      title: snippet.title,
      code: JSON.parse(code).code
    } as Snippet;
    

    dispatch({
      type: "[Snippets] - selectSnippet",
      payload: snippetSelected
    })
  }

  const saveSnippet = async( snippet: Snippet ) => {
    const aplicationPath = `${await desktopDir()}/snippets-app/snippets`;
    await writeTextFile( `${aplicationPath}/${snippet.title}.json`, JSON.stringify(snippet));
  }

  const setCode = ( code?: string ) => {
    dispatch({
      type: "[Snippets] - setCode",
      payload: code
    })
  }

  
  return (
    <SnippetContext.Provider
      value={{
        ...state,

        addSnippetName,
        deleteSnippetName,
        selectSnippet,
        saveSnippet,
        setCode
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
