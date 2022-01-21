import { ChevronDownIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { playlistIdState, playlistState } from '../recoil/atom/playlist'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSpotify } from '../hooks/useSpotify'
import { Songs } from './Songs'
import { HeartIcon } from '@heroicons/react/solid'

type ColorsType = string[]

const colors: ColorsType = [
    'from-red-300 to-slate-50',
    'from-emerald-300 to-slate-50',
    'from-blue-300 to-slate-50',
    'from-cyan-300 to-slate-50',
    'from-teal-300 to-slate-50',
    'from-indigo-300 to-slate-50',
    'from-pink-300 to-slate-50',
    'from-rose-300 to-slate-50',
]

export const Content = () => {
    const { data: session } = useSession()
    const spotifyApi = useSpotify()
    const [color, setColor] = useState<ColorsType | null>(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState<any | null>(playlistState)

    useEffect(() => {
        setColor(shuffle(colors))
    }, [playlistId])

    useEffect(() => {
        if (playlistId === 'myLikedSong') {
            spotifyApi
                .getMySavedTracks({ limit: 50 })
                .then((data: any) => setPlaylist(data.body))
                .catch((err) => console.log(err))
        } else {
            spotifyApi
                .getPlaylist(playlistId)
                .then((data) => setPlaylist(data.body))
                .catch((err) => console.log(err))
        }
    }, [spotifyApi, playlistId])

    return (
        <div className='flex-grow pb-24 bg-slate-100 w-full h-screen overflow-y-scroll scrollbar-hide text-slate-700'>
            <header className='relative'>
                <div className='absolute right-2 top-2'>
                    <button
                        onClick={() => {
                            signOut()
                        }}
                        className='flex space-x-2 items-center p-1 pr-3 bg-blue-200 shadow-lg shadow-blue-500/20 w-max rounded-full'
                    >
                        <img src={session?.user.image} className='w-10 h-10 rounded-full' />
                        <span>{session?.user.name}</span>
                        <ChevronDownIcon className='w-5 h-5' />
                    </button>
                </div>
            </header>

            <section className={`flex items-end space-x-4 bg-gradient-to-b to-slate-50 ${color} h-80 p-4`}>
                {playlistId !== 'myLikedSong' ? (
                    <img src={`${playlist?.images?.[0].url}`} className='w-44 h-44 shadow-xl rounded' alt={playlist?.name} />
                ) : (
                    <div className='w-44 h-44 bg-blue-400 rounded shadow-xl flex items-center justify-center'>
                        <HeartIcon className='text-white w-40 h-40' />
                    </div>
                )}
                <div className='flex flex-col space-y-1'>
                    <h4 className='text-base md:text-lg lg:text-xl xl:text-xl font-medium'>Playlist</h4>
                    {playlistId !== 'myLikedSong' ? (
                        <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'>{playlist?.name}</h2>
                    ) : (
                        <h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold'>Liked Songs</h2>
                    )}
                </div>
            </section>

            <Songs />
        </div>
    )
}
