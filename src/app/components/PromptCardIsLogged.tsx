import React from 'react'

interface PromptCardIsLoggedProps {
    icon: string;
    text: string;
}
const PromptCardIsLogged: React.FC<PromptCardIsLoggedProps> = ({ icon, text }) => {
    return (
        <div className='rounded-xl border shadow-sm p-3 text-sm hover:bg-gray-100 cursor-pointer'>
            <span>{icon}</span>
            <p className='text-default-500 mt-2'>{text}</p>
        </div>
    )
}

export default PromptCardIsLogged