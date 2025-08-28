import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '../../types/user';
import type { Note } from "../../types/note";
import type { AxiosResponse } from "axios";

interface FetchNotesParams{
    tag?: string;
    page?: number;
    perPage?: number;
    search?: string;
}

interface NotesResponse{
    notes: Note[];
    totalPages: number;
    page: number;
    perPage: number;
}

interface FetchNotesApiResponse{
    notes: Note[];
    totalPages: number;
}

export const fetchNotesServer = async ({
    tag,
    search,
    page = 1,
    perPage = 12,
}: FetchNotesParams): Promise<NotesResponse> => {
    const cookieStore = cookies();
    
    const res = await nextServer.get<FetchNotesApiResponse>('/notes', {
        params: { tag, page, perPage, ...(search?.trim() ? { search } : {}) },
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    return {
        page,
        perPage,
        notes: res.data.notes,
        totalPages: res.data.totalPages,
    };
};


export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
    const cookieStore = cookies();

    const res = await nextServer.get<Note>(`/notes/${id}`, {
      headers: {
          Cookie: cookieStore.toString(),
    },
  });
    return res.data;
};


export const checkServerSession = async ():Promise<AxiosResponse> => {
    const cookieStore = cookies();
    
    const res = await nextServer.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;

};



export const getMeServer = async (): Promise<User | null> => {

    try {
        const cookieStore = cookies(); 

        const res = await nextServer.get<User>('/users/me', {
        headers: {
                Cookie: cookieStore.toString(),
            },
        });
      return res.data;
      
    } catch (error) {
        console.error('Failed to fetch user on server:', error);
        return null;
  }
};