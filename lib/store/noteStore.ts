import { NoteFormValues } from '@/types/NoteFormValues';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface NoteDraftStore {
    draft: NoteFormValues;
    setDraft: (partial: Partial<NoteFormValues> | ((prevDraft: NoteFormValues) => NoteFormValues)) => void;
    clearDraft: () => void;
}

const initialDraft: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
};


export const useNoteDraftStore = create<NoteDraftStore>()(
    
    persist((set) => ({
        draft: initialDraft,
        setDraft: (partial) =>
        set((state) => ({ draft: { ...state.draft, ...partial } })),
        clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
        {
            name: 'note-draft',
            partialize: (state) => ({ draft: state.draft }),
        },
    ),
);