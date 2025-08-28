'use client'

import css from './AuthRoutes.module.css'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        router.refresh();
        setLoading(false);
    }, [router]);

    return <>
        {loading ? <div className={css.loader}></div> : children}
        </>
}

export default AuthLayout;