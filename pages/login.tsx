import { getProviders, signIn } from 'next-auth/react'
import React from 'react'
import { GetServerSideProps } from 'next'
import { MusicNoteIcon } from '@heroicons/react/outline'

const login = ({ providers }: any) => {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100'>
            {Object.values(providers).map((provider: any) => {
                return (
                    <button
                        className='px-4 py-2 flex items-center space-x-3 font-medium bg-emerald-500 hover:bg-emerald-600 rounded-md transition ease-out duration-100 shadow-lg shadow-emerald-600/40'
                        onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                        key={provider.id}
                    >
                        <span>Login with {provider.name}</span>
                        <MusicNoteIcon className='w-5 h-5' />
                    </button>
                )
            })}
        </div>
    )
}

export default login

export const getServerSideProps: GetServerSideProps = async () => {
    const providers = await getProviders()

    return {
        props: { providers },
    }
}
