import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState, playlistState } from '../recoil/atom/playlist'
import { currentTrackIdState } from '../recoil/atom/song'
import { useSpotify } from './useSpotify'

export const useSongInfo = () => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = <any | null>useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                    },
                }).then((res) => res.json())

                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo()
    }, [currentTrackId, spotifyApi])

    return songInfo
}
