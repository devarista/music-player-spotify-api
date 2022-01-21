import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
// import { useSongInfo } from '../hooks/useSongInfo'
import { useSpotify } from '../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../recoil/atom/song'
import { PlayIcon, PauseIcon, RefreshIcon, FastForwardIcon, SwitchHorizontalIcon, VolumeUpIcon, VolumeOffIcon } from '@heroicons/react/solid'
import { debounce } from 'lodash'
import { useSongInfo } from '../hooks/useSongInfo'

export const Player = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState<number>(100)
    const songInfo = useSongInfo()

    const fetchCurrentSong = () => {
        spotifyApi.getMyCurrentPlayingTrack().then((data: any) => {
            setCurrentTrackId(data.body?.item?.id)

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                setIsPlaying(data.body?.is_playing)
            })
        })
    }

    const handlePlayPause = async () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if (data.body.is_playing) {
                spotifyApi.pause()
                return setIsPlaying(false)
            }
            spotifyApi.play()
            return setIsPlaying(true)
        })
    }

    useEffect(() => {
        if (!currentTrackId) {
            fetchCurrentSong()
            setVolume(100)
        }
    }, [currentTrackId, spotifyApi])

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(
        debounce((volume: number) => {
            spotifyApi.setVolume(volume).catch((err) => console.log(err))
        }, 500),
        []
    )
    return (
        <div className='h-[4rem] w-full fixed border-t border-slate-200 bottom-0 bg-slate-100 drop-shadow-xl text-slate-800 px-3'>
            <div className='flex items-center h-full'>
                <div className='w-4/12 flex space-x-2 items-center h-full'>
                    {songInfo ? (
                        <img src={songInfo?.album.images?.[0]?.url} alt={songInfo?.name} className='hidden md:inline shadow rounded w-12 h-12' />
                    ) : (
                        <div className='w-12 h-12 font-bold text-4xl text-center flex items-center justify-center bg-blue-200 rounded shadow-blue-200'>
                            <span>!</span>
                        </div>
                    )}
                    <div className='flex items-start justify-center flex-col space-y-1 text-sm'>
                        <span className='font-semibold text-left truncate'>{songInfo?.name ?? 'Play a Song!!'}</span>
                        <span className='text-xs'>{songInfo?.artists[0].name ?? "Don't be silent!"}</span>
                    </div>
                </div>
                <div className='w-4/12 flex items-center justify-center space-x-4 text-slate-600 h-full'>
                    <SwitchHorizontalIcon className='h-4 w-4 hover:text-slate-800 cursor-pointer' />
                    <FastForwardIcon
                        onClick={() => spotifyApi.skipToPrevious()}
                        className='rotate-180 h-5 w-5 hover:text-slate-800 transition ease-in-out duration-300 cursor-pointer'
                    />
                    {isPlaying ? (
                        <PauseIcon
                            onClick={handlePlayPause}
                            className='w-12 h-12 hover:scale-110 transform text-slate-900 rounded-full transition duration-300 ease-in-out cursor-pointer'
                        />
                    ) : (
                        <PlayIcon
                            onClick={handlePlayPause}
                            className='w-12 h-12 hover:scale-110 transform text-slate-900 rounded-full transition duration-300 ease-in-out cursor-pointer'
                        />
                    )}
                    <FastForwardIcon onClick={() => spotifyApi.skipToNext()} className='h-5 w-5 hover:text-slate-800 transition ease-in-out duration-300 cursor-pointer' />
                    <RefreshIcon
                        onClick={() => {
                            // TODO!:
                            spotifyApi.getMyCurrentPlayingTrack().then((data) => console.log(data.body))
                        }}
                        className='h-4 w-4 hover:text-slate-800 cursor-pointer'
                    />
                </div>
                <div className='w-4/12 flex space-x-2 items-center h-full justify-end text-slate-800'>
                    <VolumeOffIcon className='w-4 h-4' onClick={() => volume > 0 && setVolume(volume - 10)} />
                    <input
                        type='range'
                        name='volume'
                        id='volume'
                        className='apperance-none transition ease-in-out duration-300 bg-slate-800'
                        step={10}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        min={0}
                        max={100}
                    />
                    <VolumeUpIcon className='w-4 h-4' onClick={() => volume < 100 && setVolume(volume + 10)} />
                </div>
            </div>
        </div>
    )
}
