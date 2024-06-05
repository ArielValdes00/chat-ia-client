import React from 'react'

interface PromptCardProps {
    firstLine: string;
    secondLine: string;
}
const PromptCard: React.FC<PromptCardProps> = ({ firstLine, secondLine }) => {
    return (
        <div className='w-[370px] border px-4 py-3 rounded-xl text-sm hover:bg-gray-100 cursor-pointer'>
            <p className='font-semibold mb-1'>{firstLine}</p>
            <p className='text-[13px] text-default-400'>{secondLine}</p>
        </div>
    )
}

export default PromptCard