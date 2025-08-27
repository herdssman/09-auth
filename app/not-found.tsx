import css from '@/app/page.module.css'

const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>
    );
};

export default NotFound;

export const metadata = {
    title: 'Not-found',
    description: 'This page does not exist',
    openGraph: {
        title: 'Not-found',
        description: 'This page does not exist',
        url: '/',
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
    