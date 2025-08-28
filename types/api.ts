import { Note } from "./note";

export interface NoteServiceProps {
    notes: Note[];
    totalPages: number;
}

export interface FetchNotesParams {
    page: number;
    perPage: number;
    search?: string ;
    sortBy: Sort;
    tag?: string;
}
  
export type Sort = 'created' | 'updated';

export interface UpdateUserRequest {
    username?: string;
}