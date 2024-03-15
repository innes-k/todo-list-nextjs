import { create } from "zustand";

export interface StateType {
  selectedId: string;
  nextTitle: string;
  nextContents: string;
}

export const useUpdateStore = create((set) => ({
  updateState: {
    selectedId: "",
    nextTitle: "",
    nextContents: "",
  },
  updateSelectedId: (id: string) =>
    set((state: StateType) => ({ ...state, selectedId: id })),
  updateTitle: (nextTitle: string) =>
    set((state: StateType) => ({ ...state, nextTitle: nextTitle })),
  updateContents: (nextContents: string) =>
    set((state: StateType) => ({
      ...state,
      nextContents: nextContents,
    })),
}));
