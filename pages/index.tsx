import { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Content } from '../components/Content'
import { Player } from '../components/Player'
import { Sidebar } from '../components/Sidebar'

const Home = () => {
    return (
        <div className='h-screen overflow-hidden'>
            <Head>
                <title>Spotify Web API Music Player</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className='flex'>
                <Sidebar />
                <Content />
            </main>

            <div className='relative'>
                <Player />
            </div>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    return {
        props: {
            session,
        },
    }
}
