'use client'

// import css from './AuthProvider.module.css'
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AuthProps {
    children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProps) => {
    
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const verifySession = async () => {

            const isAuthenticated = await checkSession();

            if (isAuthenticated) {
                const user = await getMe();
                if (user) {
                    setUser(user)
                } else {
                    clearIsAuthenticated();
                };
            } else {
                clearIsAuthenticated();
            }
        };
        verifySession();

    }, [setUser, clearIsAuthenticated, pathname]);

    // if (loading) {
    //     return (
    //         <div className={css.cont}>
    //             <div className={css.loader}></div>
    //         </div>
    //     )
    // }

    return children;
};

export default AuthProvider;