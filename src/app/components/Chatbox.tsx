import React, { useState } from 'react';
import PromptCard from './PromptCard';
import Prompt from './Prompt';
import { Avatar } from '@nextui-org/react';
import PromptCardIsLogged from './PromptCardIsLogged';
import GeminiIcon from '../icons/GeminiIcon';
import ChatMessages from './ChatMessages';
import { generateAIResponse } from '../utils/GeminiConfig';

interface ChatboxProps {
    isLogged: boolean;
    userData: any | undefined;
}

const Chatbox: React.FC<ChatboxProps> = ({ isLogged, userData }) => {
    const [messages, setMessages] = useState<any>([]);
    const [isAILoading, setAILoading] = useState(false);

    const handleEnterClick = async (promptValue: string) => {
        const newMessage: any = {
            content: promptValue,
            timestamp: new Date().toISOString(),
            sender: "user",
        };
    
        setMessages((messages: any) => [...messages, newMessage]);
        setAILoading(true); 
    
        try {
            const aiResponse = await generateAIResponse(promptValue);
            setMessages((messages: any) => [...messages, aiResponse]);
        } catch (error) {
            console.error("Error occurred while generating AI response:", error);
        } finally {
            setAILoading(false); 
        }
    };

    return (
        <div className="flex flex-col w-full items-center pb-2 justify-between h-full bg-white">
            <div className='h-16 px-5 w-full flex items-center justify-end'>
                {isLogged && <Avatar size='sm' src={userData && userData[0]?.avatar} />}
            </div>
            <div className={`${messages.length > 0 ? 'overflow-y-auto w-full h-full flex items-start justify-center my-4' : ''}`}>
                {messages.length > 0
                    ? <ChatMessages messages={messages} isAILoading={isAILoading} />
                    : (
                        <>
                            <div className='flex flex-col gap-4 items-center'>
                                <GeminiIcon
                                    color='#000000'
                                    width='45'
                                    height='45'
                                />
                                {!isLogged && <p className='font-semibold text-2xl mb-7'>¿Cómo puedo ayudarte hoy?</p>}
                                {isLogged && (
                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 px-3 md:w-[590px] xl:w-[750px]'>
                                        <PromptCardIsLogged
                                            icon='p'
                                            text='Actividades para hacer con amigos'
                                        />
                                        <PromptCardIsLogged
                                            icon='p'
                                            text='Actividades para hacer con amigos'
                                        />
                                        <PromptCardIsLogged
                                            icon='p'
                                            text='Actividades para hacer con amigos'
                                        />
                                        <PromptCardIsLogged
                                            icon='p'
                                            text='Actividades para hacer con amigos'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col items-center justify-center px-2 gap-2 md:w-[590px] xl:w-[750px]'>
                                {!isLogged && (
                                    <div className='grid grid-cols-2 gap-2 w-full'>
                                        <PromptCard
                                            firstLine='Crea un plan de entrenamiento'
                                            secondLine='para entrenar la resistencia'
                                        />
                                        <PromptCard
                                            firstLine='Diseña tu juego'
                                            secondLine='para programar y aprender divirtiéndonos'
                                        />
                                        <PromptCard
                                            firstLine='Cuéntame un dato curioso'
                                            secondLine='sobre el Imperio Romano'
                                        />
                                        <PromptCard
                                            firstLine='Planifica un viaje'
                                            secondLine='para conocer Seúl como un local'
                                        />
                                    </div>
                                )}

                            </div>
                        </>
                    )}
            </div>
            <div className='w-full md:w-[590px] xl:w-[750px] px-2'>
                <Prompt isLogged={isLogged} onSendMessage={handleEnterClick} />
                <p className='text-xs text-gray-500 text-center mt-2'>© 2024 GeminiIA Inc. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Chatbox;
