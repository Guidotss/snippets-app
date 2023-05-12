import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Snippet {
  id: string;
  title: string;
  code: string | undefined;
}

interface SnippetsState {
  snippets: Snippet[];
  snippetsNames: string[];
  isSnippetOpen: boolean;
  selectedSnippet: Snippet | null;
  lastSnippetName: string;
  isSnippetSaved: boolean;

  addSnippetName: (snippetName: string) => void;
  deleteSnippetName: (snippetName: string) => void;
  saveSnippet: (snippet:Snippet) => void;
  selectSnippet: (snippetName: string) => void;
  setLastSnippetName: (snippetName: string) => void;
  setSnippets: (snippets: Snippet[]) => void;
}

export const useSnippetsStore = create<SnippetsState>()(
  devtools((set) => ({
    snippets: [],
    snippetsNames: [],
    isSnippetOpen: false,
    selectedSnippet: null,
    isSnippetSaved: false,
    lastSnippetName: "",

    addSnippetName: (snippetName: string) =>
      set((state) => ({
        snippetsNames: [...state.snippetsNames, snippetName],
      })),

    deleteSnippetName: (snippetName: string) =>
      set((state) => ({
        snippetsNames: state.snippetsNames.filter(
          (name) => name !== snippetName
        ),
      })),

    saveSnippet: (snippet:Snippet) =>
      set((state) => ({
        isSnippetSaved: true,
        snippets: [...state.snippets, snippet],
      })),

    selectSnippet: (snippetName: string) =>
      set((state) => ({
        isSnippetOpen: true,
        selectedSnippet:
          state.snippets.find((snippet) => snippet.id === snippetName) || null,
      })),

    setLastSnippetName: (snippetName: string) =>
      set((state) => ({
        lastSnippetName: snippetName,
      })),
    
    setSnippets: (loadedSnippets: Snippet[]) =>
        set((state) => ({
            snippets: loadedSnippets,
        })),
  }))

);
