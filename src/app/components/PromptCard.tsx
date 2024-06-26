import React from 'react'

interface PromptCardProps {
    firstLine: string;
    secondLine: string;
    selectCard: (text: string) => void;
}
const PromptCard: React.FC<PromptCardProps> = ({ firstLine, secondLine, selectCard }) => {
    return (
        <div className='border px-3 py-3 md:px-4 md:py-3 rounded-xl text-sm hover:bg-gray-100 cursor-pointer' onClick={() => selectCard(firstLine + secondLine)}>
            <p className='font-semibold mb-1'>{firstLine}</p>
            <p className='text-[13px] text-default-400'>{secondLine}</p>
        </div>
    )
}

export default PromptCard