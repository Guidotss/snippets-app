import { createContext } from 'react';
import { Snippet } from '../interfaces/snippet';
import { FileEntry } from '@tauri-apps/api/fs';


interface SnippetContextProps {
    snippetName: string;
    snippetsNames: string[];
    selectedSnippet?: Snippet; 
    code?: string; 

    addSnippetName: ( snippetName: string ) => void; 
    deleteSnippetName: ( id: number ) => void; 
    selectSnippet: ( snippet: Snippet ) => void; 
    saveSnippet: ( snippet: Snippet ) => void;
    setCode: ( code: string ) => void;
}


export const SnippetContext = createContext({} as SnippetContextProps);