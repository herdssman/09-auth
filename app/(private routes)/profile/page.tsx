import css from './ProfilePage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/types/user';

interface PageProps {
    params: Promise<{user: User}>
}

const Profile = async ({params}: PageProps) => {

    const { user } = await params;

  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src="Avatar"
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
  )
}

export default Profile;

export const generateMetadata = async ({ params }: PageProps) => {

    const { user } = await params;

    return {
        title: `${user.username} profile`,
        description: `Take a look at ${user.username}'s proifile`,
        openGraph: {
            title: `${user.username} profile`,
            description: `Take a look at ${user.username}'s proifile`,
            url: `/users/me`,
            siteName: 'NoteHub',
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub app',
            }],
            type: 'websitarticlee',
        }
    }
}