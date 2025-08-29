import css from './ProfilePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
// import { User } from '@/types/user';
import { getMeServer } from '@/lib/api/serverApi';
import { Metadata } from 'next';

// interface PageProps {
//     params: Promise<{user: User}>
// }

export const dynamic = 'force-dynamic';


const Profile = async () => {
    let user;
    try {
        user = await getMeServer();
    } catch (error) {
        console.error('Failed to load profile:', error);
    }

    if (!user) {
        return <p>User not found or not authenticated.</p>;
    }
    
    const { username, email, avatar} = user;

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href='/profile/edit' className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={avatar || '/avatar.png'}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {username}
      </p>
      <p>
        Email: {email}
      </p>
    </div>
  </div>
</main>
  )
}

export default Profile;

export const generateMetadata = async (): Promise<Metadata> => {

    const { username } = await getMeServer();

    return {
        title: `${username} profile`,
        description: `Take a look at ${username}'s profile`,
        openGraph: {
            title: `${username} profile`,
            description: `Take a look at ${username}'s profile`,
            url: `/users/me`,
            siteName: 'NoteHub',
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub app',
            }],
            type: 'article',
        }
    }
}