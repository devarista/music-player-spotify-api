import { milisToMinutesAndSeconds } from '../lib/time'
import { useSpotify } from '../hooks/useSpotify'
import { currentTrackIdState, isPlayingState } from '../recoil/atom/song'
import { useRecoilState } from 'recoil'

interface SongInterface {
    order: number
    track: any | null
}

export const Song = ({ order, track }: SongInterface) => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const playSong = async () => {
        setCurrentTrackId(track.track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.track.uri],
        })
    }

    return (
        <div
            onClick={playSong}
            className={`flex items-center justify-between text-xs lg:text-sm xl:text-base text-slate-500 hover:text-slate-800 group w-12/12 ${
                track.track.id === currentTrackId && 'bg-blue-300'
            } hover:bg-blue-200 transition ease-out duration-100 p-2 rounded cursor-default`}
        >
            <div className='flex md:w-7/12 items-center space-x-2'>
                <img src={track?.track?.album?.images?.[0].url} alt={track?.track.name} className='rounded w-12 md:w-14 h-12 md:h-14 shadow-md' />
                <div className='flex flex-col justify-around max-w-[22rem] md:max-w-[12rem] lg:min-w-[28rem] lg:max-w-xl'>
                    <div className='flex-grow font-semibold text-slate-800 truncate'>{track.track.name}</div>
                    <div className='flex font-medium text-slate-5 truncate'>{track.track.artists[0].name}</div>
                </div>
            </div>
            <div className='flex items-center justify-between md:w-5/12'>
                <span className='font-medium md:line-clamp-2 hidden md:inline md:max-w-[10rem]'>{track.track.album.name}</span>
                <span className='font-medium'>{milisToMinutesAndSeconds(track.track.duration_ms)}</span>
            </div>
        </div>
    )
}
