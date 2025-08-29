import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "./lib/api/serverApi";
import { parse } from "cookie";
 

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];
 
export async function middleware(request: NextRequest) {
     
    const { pathname } = request.nextUrl;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
    const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

    if (!accessToken) {

        if (refreshToken) {
            const data = await checkServerSession();
            const setCookie = data.headers['set-cookie'];

            if (setCookie) {
                const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

                const response = NextResponse.next();
                
                for (const cookieStr of cookieArray) {
                    const parsed = parse(cookieStr);
                    
                    if (parsed.accessToken) response.headers.append('Set-Cookie', `accessToken=${parsed.accessToken}; Path=/; HttpOnly`);
                    
                    if (parsed.refreshToken) response.headers.append('Set-Cookie', `refreshToken=${parsed.refreshToken}; Path=/; HttpOnly`);
                }
                if (isPublicRoute) {
             
                    return NextResponse.redirect(new URL('/', request.url), {
                        headers: response.headers,
                    });
                }
                if (isPrivateRoute) {
                    return response;
                }
            }
        }
        if (isPublicRoute) {
            return NextResponse.next();
        }
        if (isPrivateRoute) {
            return NextResponse.redirect(new URL('/sign-in',request.url));
        }
    }

    if (accessToken && isPublicRoute) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};