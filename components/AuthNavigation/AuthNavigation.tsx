import css from './AuthNavigation.module.css'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/router'


const AuthNavigation = () => {

    const router = useRouter();

    const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

    const handleLogout = () => {
        clearIsAuthenticated();
        router.push('/login');
    };

  return isAuthenticated ? (
      <ul>
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
      <ul>
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