'use client'

import css from './AuthNavigation.module.css'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/api/clientApi'


const AuthNavigation = () => {

    const router = useRouter();

    const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();

        } catch {
            throw new Error('Failed to logout. Please ensure your connection and try again');

        } finally {
            clearIsAuthenticated();
            router.push('/login');
        }
    };

  return isAuthenticated ? (
      <ul className={css.navAuth}>
           <li className={css.navigationItem}>
              <Link href="/profile" prefetch={false} className={css.navigationLink}>
                  Profile
              </Link>
          </li>
          <li className={css.navigationItem}>
              <p className={css.userEmail}>{user?.email}</p>
              <button className={css.logoutButton} onClick={handleLogout}>
                  Logout
              </button>
          </li>
      </ul>
  ) : (
      <ul className={css.navAuth}>
          <li className={css.navigationItem}>
              <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                  Login
              </Link>
          </li>
          <li className={css.navigationItem}>
              <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                  Sign up
              </Link>
          </li>
      </ul>
  )
}

export default AuthNavigation;