import React, { useEffect, useState } from 'react'
import { HomeIcon, LibraryIcon, LogoutIcon, PlusCircleIcon, SearchIcon } from '@heroicons/react/outline'
import { HeartIcon } from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import { useSpotify } from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../recoil/atom/playlist'

export const Sidebar = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState<any | null>([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])

    return (
        <div className='hidden pb-24 relative md:shadow-lg md:shadow-slate-500/20 md:flex md:flex-col md:space-y-2 lg:space-y-3 xl:space-y-4 md:max-w-[18rem] lg:max-w-[20rem] h-screen bg-slate-100 font-semibold text-slate-600 overflow-y-scroll scrollbar-hide'>
            <div className='px-2 pt-2 lg:px-4 bg-slate-100 sticky top-0 flex flex-col space-y-2 lg:space-y-3 xl:space-y-4 text-slate-600'>
                <div className='flex flex-col space-y-2 lg:space-y-3 xl:space-y-4 w-full font-semibold text-slate-600'>
                    <h1 className='text-2xl lg:text-3xl py-1 lg:py-2 font-black pl-1.5 bg-gradient-to-br from-emerald-500 to-indigo-500 bg-clip-text text-transparent'>Spotify</h1>
                    <div className='flex flex-col space-y-1 w-full'>
                        <button
                            type='button'
                            className='w-full px-2 py-1 rounded lg:rounded-md flex space-x-4 items-center text-base font-medium hover:bg-blue-200 hover:text-slate-900 transition ease-out duration-200'
                        >
                            <HomeIcon className='w-4 lg:w-5 h-4 lg:h-5' />
                            <span className='text-xs lg:text-sm xl:text-base'>Home</span>
                        </button>
                        <button
                            type='button'
                            className='w-full px-2 py-1 rounded lg:rounded-md flex space-x-4 items-center text-base font-medium hover:bg-blue-200 hover:text-slate-900 transition ease-out duration-200'
                        >
                            <SearchIcon className='w-4 lg:w-5 h-4 lg:h-5' />
                            <span className='text-xs lg:text-sm xl:text-base'>Search</span>
                        </button>
                        <button
                            type='button'
                            className='w-full px-2 py-1 rounded lg:rounded-md flex space-x-4 items-center text-base font-medium hover:bg-blue-200 hover:text-slate-900 transition ease-out duration-200'
                        >
                            <LibraryIcon className='w-4 lg:w-5 h-4 lg:h-5' />
                            <span className='text-xs lg:text-sm xl:text-base'>Your Library</span>
                        </button>
                    </div>
                    <hr className='border-slate-300' />
                    <div className='flex flex-col space-y-1 w-full'>
                        <button
                            type='button'
                            className='w-full px-2 py-1 rounded lg:rounded-md flex space-x-4 items-center text-base font-medium hover:bg-blue-200 hover:text-slate-900 transition ease-out duration-200'
                        >
                            <PlusCircleIcon className='w-4 lg:w-5 h-4 lg:h-5' />
                            <span className='text-xs lg:text-sm xl:text-base'>Create Playlist</span>
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setPlaylistId('myLikedSong')
                                spotifyApi.getMySavedTracks().then((data) => console.log(data.body))
                            }}
                            className={`${
                                playlistId === 'myLikedSong' && 'bg-blue-300'
                            } w-full px-2 py-1 rounded lg:rounded-md flex space-x-4 items-center text-base font-medium hover:bg-blue-200 hover:text-slate-900 transition ease-out duration-200`}
                        >
                            <HeartIcon className='w-4 lg:w-5 h-4 lg:h-5' />
                            <span className='text-xs lg:text-sm xl:text-base'>Liked Songs</span>
                        </button>
                    </div>
                </div>
                <hr className='border-slate-300' />
            </div>

            <div className='flex flex-col space-y-1 w-full px-2 lg:px-4 text-slate-600'>
                {playlists.map((playlist: any) => {
                    return (
                        <button
                            onClick={() => setPlaylistId(playlist.id)}
                            type='button'
                            key={playlist.id}
                            className={`w-full text-xs lg:text-sm xl:text-base px-2 py-1 rounded lg:rounded-md truncate text-left font-medium ${
                                playlistId === playlist.id && 'bg-blue-300'
                            } hover:bg-blue-200 hover:text-slate-900 transition ease-out duration-200`}
                        >
                            {playlist.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
