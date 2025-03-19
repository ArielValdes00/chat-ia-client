import Image from 'next/image'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center border'>
            <Image unoptimized priority src={"/loader.gif"} alt='loader' height={100} width={100}/>
        </div>
    )
}

export default Loading