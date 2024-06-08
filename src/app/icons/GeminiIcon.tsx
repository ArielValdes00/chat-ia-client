import React from 'react'

interface GeminiIconProps {
    color: string;
    width: string;
    height: string;
}
const GeminiIcon: React.FC<GeminiIconProps> = ({ color, width, height }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} color={color} fill="none">
            <path d="M3 12C7.97056 12 12 7.97056 12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
    )
}

export default GeminiIcon