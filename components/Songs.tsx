import React from 'react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../recoil/atom/playlist'
import { Song } from './Song'

export const Songs = () => {
    const playlist = useRecoilValue<any | null>(playlistState)
    return (
        <div className='p-2 text-slate-700 flex flex-col space-y-2 w-full'>
            {playlist?.tracks
                ? playlist?.tracks?.items.map((track: any, i: number) => <Song key={track.track.id} track={track} order={i} />)
                : playlist?.items?.map((track: any, i: number) => <Song key={track.track.id} track={track} order={i} />)}
        </div>
    )
}
