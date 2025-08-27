import type { Note } from '../../types/note';
import { nextServer } from './api';

export async function deleteNote(noteId: string): Promise<Note> {

    try {
        const response = await nextServer.delete<Note>(`/notes/${noteId}`,
        );
        
        return response.data;

    } catch {
        throw new Error("Failed to delete note. Please ensure your connection and try again");
    }
}