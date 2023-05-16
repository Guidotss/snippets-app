import { FC, useReducer } from "react";
import { SnippetContext, snippetReducer } from ".";

interface SnippetProviderProps {
  children: React.ReactNode;
}

export interface SnippetState {
  snippetName: string;
  snippetsNames: string[];
}

const SNIPPETS_INITIAL_STATE: SnippetState = {
  snippetName: "",
  snippetsNames: [],
};

export const SnippetProvider: FC<SnippetProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer( snippetReducer, SNIPPETS_INITIAL_STATE);


  const addSnippetName = ( snippetName: string ) => {
    dispatch({
      type: '[Snippets - addSnippet]',
      payload: snippetName
    })
  }

  const deleteSnippetName = ( snippetName: string ) => {
    dispatch({
      type: '[Snippets - deleteSnippet]',
      payload: snippetName
    })
  }

  return (
    <SnippetContext.Provider
      value={{
        ...state,

        addSnippetName,
        deleteSnippetName
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};
