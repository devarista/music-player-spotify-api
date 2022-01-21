
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXTAUTH_URL:string
      NEXT_PUBLIC_SPOTIFY_ID:string
      NEXT_PUBLIC_SPOTIFY_SECRET:string
      JWT_SECRET:string
    }
  }
}
export {}