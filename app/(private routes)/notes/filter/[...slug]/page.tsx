import { fetchNotesServer } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';
import { Tag } from '@/types/tag';
import { tags } from '../@sidebar/default';

interface SlugProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: SlugProps) {
    const { slug } = await params;
    const search = '';
    const page = 1;
    const perPage = 12;
    const rawTag = slug?.[0];
    const tag = rawTag === 'all' || !tags.includes(rawTag as Tag) ? undefined: (rawTag as Tag);

    const { notes, totalPages } = await fetchNotesServer({
        search,
        page, 
        perPage,
        tag,
    })

    return (
        <div>
            <NotesClient notes={notes} totalPages={totalPages} tag={tag} />
        </div>
    );
}

export const generateMetadata = async ({ params }: SlugProps
) => {
    const { slug } = await params;
    const rawTag = slug?.[0];
    const tag = rawTag === 'all' || !tags.includes(rawTag as Tag) ? undefined : (rawTag as Tag);
    
    return {
        title: `${tag} notes`,
        description: `All notes with ${tag} tag`,
        openGraph: {
            title: `${tag} notes`,
            description: `All notes with ${tag} tag`,
            url: `/notes/filter/${tag}`,
            siteName: 'NoteHub',
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub app',
            }],
            type: 'website',
        }
    }
}







