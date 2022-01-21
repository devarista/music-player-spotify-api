import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth/session"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken:string
      refreshToken:string
      username:string
      image:string
      name:string
    }
  }
}

declare module "next-auth/jwt"{
   interface JWT {
    accessToken: string
    refreshToken:string
    username: string
    picture:string
    name:string
    accessTokenExpires: 3600
  }
}