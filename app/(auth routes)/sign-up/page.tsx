'use client'

import css from './SignUpPage.module.css'
import { useRouter } from 'next/router';
import { register } from '@/lib/api/clientApi';
import { ApiError } from '@/types/error';
import { RegisterLoginRequest } from '@/types/signIn-signUp';
import { useState } from 'react';

const SignUp = () => {

    const router = useRouter();
    const [error, setError] = useState('');

    const handleSubmit = async (formData: FormData) => {
        try {
            const raw = Object.fromEntries(formData);
            const formValues = raw as unknown as RegisterLoginRequest;

            const res = await register(formValues);
            if (res) {
                router.push('/profile');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            const resErr = error as ApiError;

            const errorMessage = resErr.response?.data?.error ?? resErr.message;

            console.error('Registration error:', errorMessage);
            setError(errorMessage);

        }
    }




  return (
    <main className={css.mainContent}>
  <h1 className={css.formTitle}>Sign up</h1>
	<form className={css.form} action={handleSubmit}>
    <div className={css.formGroup}>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" className={css.input} required />
    </div>

    <div className={css.formGroup}>
      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" className={css.input} required />
    </div>

    <div className={css.actions}>
      <button type="submit" className={css.submitButton}>
        Register
      </button>
    </div>

    <p className={css.error}>{error}</p>
  </form>
</main>

  )
}

export default SignUp;