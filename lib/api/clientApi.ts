import type { Note } from '../../types/note';
import type { CreateNote } from '../../types/createNote'
import { Tag } from '@/types/tag';
import { NoteServiceProps, FetchNotesParams } from '@/types/api';
import { nextServer } from './api';
import { User } from '@/types/user';
import { RegisterLoginRequest } from '@/types/signIn-signUp';

export async function fetchNotes({ search, page, perPage, sortBy }: FetchNotesParams, tag?: Tag): Promise<{ notes: Note[]; totalPages: number }> {
    
    const params = {
        page,
        perPage,
        sortBy,
    } as { page: number; perPage: number; sortBy: string; search?: string; tag?: Tag};

    if (search?.trim() !== '') {
        params.search = search?.trim();
    }
    
    if (tag) {
        params.tag = tag;
    }

    try {
        const response = await nextServer.get<NoteServiceProps>(`/notes`, { params });
        const { notes, totalPages } = response.data;

        return { notes, totalPages };

    } catch {
        throw new Error('Failed to load notes. Please ensure your connection and try again')
    }

}

export async function createNote(newNote: CreateNote): Promise<Note> {
    
    try {
        const response = await nextServer.post<Note>(`/notes`, newNote)
        return response.data;

    } catch {
        throw new Error('Failed to create note. Please ensure your connection and try again')
    }
}

export async function fetchNoteById(id: string): Promise<Note> {

    try {
        const response = await nextServer.get<Note>(`/notes/${id}`);
        return response.data;

    } catch {
        throw new Error("Failed to load this note. Please ensure your connection and try again");
    }
}

export async function register(data: RegisterLoginRequest) {

    const res = await nextServer.post<User>('auth/register', data);
    return res.data;
}

export async function login(data: RegisterLoginRequest) {

    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
}

type CheckSessionRequest = {
    success: boolean;
}

export async function checkSession() {

    const res = await nextServer<CheckSessionRequest>('/auth/session');
    return res.data;
}

export async function getMe() {

    const { data } = await nextServer.get<User>('/users/me');
    return data
} 