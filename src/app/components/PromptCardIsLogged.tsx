import React from 'react'

interface PromptCardIsLoggedProps {
    icon: React.ReactNode;
    text: string;
    selectCard: (text: string) => void
}
const PromptCardIsLogged: React.FC<PromptCardIsLoggedProps> = ({ icon, text, selectCard }) => {
    return (
        <div className='rounded-xl border shadow-sm p-3 text-sm hover:bg-gray-100 cursor-pointer' onClick={() => selectCard(text)}>
            <span>{icon}</span>
            <p className='text-default-500 mt-2'>{text}</p>
        </div>
    )
}

export default PromptCardIsLogged