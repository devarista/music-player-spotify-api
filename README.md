# Spotify Clone

Using [Typescript Next.Js](https://nextjs.org), [NextAuth](https://next-auth.js.org), [Recoil](https://recoiljs.org), [TailwindCSS](https://tailwindcss.com) & [Spotify Web Api](https://developer.spotify.com)

![Spotify Clone](/public/ss.png "Spotify Clone")

## Installation

**Pre Requisites : Spotify Account to access Developer Dashboard**

1. Installing Dependencies

    ```
    npm install
    ```

2. Create `.env.local` with the following key & value pairs

    ```
    NEXTAUTH_URL=http://localhost:3000
    NEXT_PUBLIC_SPOTIFY_ID=your_spotify_client_id
    NEXT_PUBLIC_SPOTIFY_SECRET=your_spotify_client_secret
    JWT_SECRET=encrypted_secret_string
    ```

3. Run `npm run dev`
