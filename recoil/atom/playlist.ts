import { atom } from 'recoil'

export const playlistIdState = atom({
    key: 'playlistIdState',
    // default: '5acGzAC0OH4QDVj5hlFqlK',
    default: 'myLikedSong',
})

export const playlistState = atom({
    key: 'playlistState',
    default: null,
})
