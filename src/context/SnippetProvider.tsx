import { FC, useReducer } from "react";
import { SnippetContext, snippetReducer } from ".";
import { Snippet } from "../interfaces";
import { writeTextFile,removeFile } from '@tauri-apps/api/fs'; 
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
    await removeFile( `${aplicationPath}/${state.snippetsNames[id]}.json` ); 

    dispatch({
      type: '[Snippets] - deleteSnippet',
      payload: id
    }); 
  }


  const selectSnippet = ( snippet:Snippet ) => {

    dispatch({
      type: "[Snippets] - selectSnippet",
      payload: snippet
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
