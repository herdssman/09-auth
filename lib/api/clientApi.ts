'use client';

import type { Note } from '../../types/note';
import type { CreateNote } from '../../types/createNote'
import { Tag } from '@/types/tag';
import { NoteServiceProps, FetchNotesParams, UpdateUserRequest } from '@/types/api';
import { nextServer } from './api';
import { User } from '@/types/user';
import { RegisterRequest, LoginRequest } from '@/types/signIn-signUp';

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

export async function deleteNote(noteId: string): Promise<Note> {

    try {
        const response = await nextServer.delete<Note>(`/notes/${noteId}`,
        );
        
        return response.data;

    } catch {
        throw new Error("Failed to delete note. Please ensure your connection and try again");
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

export async function register(data: RegisterRequest) {

    const res = await nextServer.post<User>('auth/register', data);
    return res.data;
}

export async function login(data: LoginRequest) {

    const res = await nextServer.post<User>('/auth/login', data);
    return res.data;
}

export async function logout(): Promise<void> {

    try {
        await nextServer.post('auth/logout');

    } catch {
        throw new Error('Failed to logout. Please ensure your connection and try again');
    }
}

type CheckSessionRequest = {
    success: boolean;
}

export async function checkSession(): Promise<boolean> {

    const res = await nextServer.get<CheckSessionRequest>('/auth/session');
    return res.data.success;
}

export async function getMe(): Promise<User> {

    const { data } = await nextServer.get<User>('/users/me');
    return data;
} 

export async function updateMe(data: UpdateUserRequest): Promise<User> {
    const res = await nextServer.patch<User>('/users/me', data);
    return res.data;
}