import { FileEntry } from '@tauri-apps/api/fs';
import { SnippetState } from '.'; 
import { Snippet } from '../interfaces';




type SnippetsActionType = 
    | { type: "[Snippets] - addSnippet", payload: string }
    | { type: "[Snippets] - deleteSnippet", payload: number }
    | { type: "[Snippets] - selectSnippet", payload: Snippet }
    | { type: "[Snippets] - setCode", payload?: string }
    | { type: "[Snippets] - loadFiles", payload: {title:FileEntry, code:string}[] }


export const snippetReducer = (state: SnippetState, action: SnippetsActionType): SnippetState => {
    switch (action.type) {
        case '[Snippets] - addSnippet': 
            return {
                ...state,
                snippetName: action.payload,
                snippetsNames: [...state.snippetsNames, action.payload],
            }
        
        case '[Snippets] - deleteSnippet': 
            return {
                ...state, 
                selectedSnippet: undefined,
                snippetsNames: state.snippetsNames.filter((_, index) => index !== action.payload)
            }
        
        case '[Snippets] - selectSnippet': 
            return {
                ...state,
                selectedSnippet: action.payload
            }

        case '[Snippets] - setCode':
            return {
                ...state,
                code: action.payload
            }
        
        case '[Snippets] - loadFiles':
            return {
                ...state,
                snippetsNames: action.payload.map(file =>{
                    return file.title.name?.split('.')[0] || ''
                }),
            }
    }
}