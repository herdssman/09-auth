'use client'

import css from './AuthProvider.module.css'
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthProps {
    children: React.ReactNode;
}

const privateRoutes =  ['/notes', '/profile']

const AuthProvider = ({ children }: AuthProps) => {
    

    const [isLoading, setIsLoading] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        
        const verifySession = async () => {
            setIsLoading(true);

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

                if (privateRoutes.some((route) => pathname.startsWith(route))) {
                    router.replace('/login');
                }
            }
            setIsLoading(false);
        };
        verifySession();

    }, [setUser, clearIsAuthenticated, pathname, router]);

    if (isLoading) {
        return (
            <div className={css.loader}></div>
        )
    }

    return children;
};

export default AuthProvider;