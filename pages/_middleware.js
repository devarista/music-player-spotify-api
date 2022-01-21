import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (req) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    const { pathname } = req.nextUrl

    if (pathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    if (!token && pathname !== '/login') {
        return NextResponse.redirect('/login')
    }
}
