import { create } from 'zustand'; 
import { devtools } from 'zustand/middleware'; 


interface Snippet {
    id: string;
    title: string;
    code: string | null; 
}

interface SnippetsState {
    snippets: Snippet[];
    snippetsNames: string[];
    isSnippetOpen: boolean;
    addSnippetName: (snippetName: string) => void;
    deleteSnippetName: (snippetName: string) => void;
    selectSnippet: (snippetName: string) => void;
}


export const useSnippetsStore = create<SnippetsState>()(
    devtools((set) => ({
        snippets: [],
        snippetsNames: [],
        isSnippetOpen: false,

        addSnippetName: (snippetName: string) => 
            set((state) => ({
                snippetsNames: [...state.snippetsNames, snippetName],
            })),
        
        deleteSnippetName: (snippetName: string) => 
            set((state) => ({
                snippetsNames: state.snippetsNames.filter((name) => name !== snippetName),
            })),
        
        selectSnippet: (snippetName: string) =>
            set((state) => ({
                isSnippetOpen: true,
                snippets: [...state.snippets, { id: snippetName, title: snippetName, code: null }],
            })),
        
    }))
); 
