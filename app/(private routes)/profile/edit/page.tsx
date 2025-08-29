'use client'

import css from './EditProfilePage.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

const EditPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [initialUsername, setInitialUsername] = useState('');
    const router = useRouter();
const setUser = useAuthStore((state) => state.setUser);


    useEffect(() => {
        getMe().then((user) => {
            const name = user.username ?? '';
            const userEmail = user.email ?? '';

            setUsername(name);
            setInitialUsername(name);
            setEmail(userEmail);
            setAvatar(user.avatar ?? '');
        })
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const updatedUser = await updateMe({ username });
setUser(updatedUser);
            router.push('/profile');
        } catch {
            throw new Error('Failed to save changes. Please ensure your connection and try again')
        }
    };

    const handleCancel = () => {
        setUsername(initialUsername);
        router.push('/profile');
    };


  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src={avatar || '/avatar.png'}
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo} onSubmit={handleSaveUser}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
          value={username} 
          onChange={handleChange}
        />
      </div>

        <p>Email: {email}</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton} disabled={username === initialUsername}>
          Save
        </button>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

  )
}

export default EditPage;