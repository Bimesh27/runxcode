import { create } from "zustand";
import { Monaco } from "@monaco-editor/react";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { CodeEditorState, ExecutionResult } from "@/types";

const getInitialState = () => {
  if(typeof window === "undefined") {
    return {
      language: "javascript",
      fontSize: 16,
      theme: "vs-dark",
    }
  }


  const savedLanguage = localStorage.getItem("editor-language") || "javascript";
  const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
  const savedFontSize = localStorage.getItem("editor-font-size") || 16;

  return {
    language: savedLanguage,
    theme: savedTheme,
    fontSize: Number(savedFontSize),
  }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
  const initialState =  getInitialState();
  return {
    ...initialState, 
    output: "",
    isRunning: false,
    editor: null,
    error: null,
    executionResult: null,

    getCode: () => get().editor?.getValue() || "",

    setEditor: (editor: Monaco) => {
      const savedCode = localStorage.getItem(`editor-code-${get().language}`);

      if(savedCode) {
        editor.setValue(savedCode);
      }
      set({ editor });
    },

    setTheme: (theme: string) => {
      localStorage.setItem("editor-theme", theme);
      set({ theme });
    },

    setFontSize: (fontSize: number) => {
      localStorage.setItem("editor-font-size", fontSize.toString());
      set({ fontSize });
    },

    setLanguage: (language: string) => {
      const currentCode = get().editor?.getValue();
      if(currentCode) {
        localStorage.setItem(`editor-code-${get().language}`, currentCode);
      }

      localStorage.setItem("editor-language", language);

      set({
        language,
        output: "",
        error: null,
      })
    },

    runCode: async () => {
      
    }
  }
})