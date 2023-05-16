import { createContext } from 'react';


interface SnippetContextProps {
    snippetName: string;
    snippetsNames: string[]; 

    addSnippetName: ( snippetName: string ) => void; 
    deleteSnippetName: ( snippetName: string ) => void; 
}


export const SnippetContext = createContext({} as SnippetContextProps);