import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "./lib/api/serverApi";
 

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
                
                cookieArray.forEach((cookieHeader) => {
                    response.headers.append('Set-Cookie', cookieHeader);
                });
                
                if (isPublicRoute) {
             
                    return NextResponse.redirect(new URL('/', request.url), {
                        headers: response.headers,
                    });
                }
                if (isPrivateRoute) {
                    return response;
                }

                return response;
            } else {

                if (isPrivateRoute) {
                    return NextResponse.redirect(new URL('/sign-in', request.url));
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
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (!accessToken && isPublicRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};