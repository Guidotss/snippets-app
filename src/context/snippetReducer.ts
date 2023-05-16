import { SnippetState } from '.'; 


type SnippetsActionType = 
    | { type: "[Snippets - addSnippet]", payload: string }
    | { type: "[Snippets - deleteSnippet]", payload: string }


export const snippetReducer = (state: SnippetState, action: SnippetsActionType): SnippetState => {
    switch (action.type) {
        case '[Snippets - addSnippet]': 
            return {
                ...state,
                snippetName: action.payload,
                snippetsNames: [...state.snippetsNames, action.payload]
            }
        
        case '[Snippets - deleteSnippet]': 
            return {
                ...state, 
                snippetsNames: state.snippetsNames.filter(snippetName => snippetName !== action.payload )
            }
        
    }
}