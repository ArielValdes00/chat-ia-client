import React, { useState } from 'react';
import PromptCard from './PromptCard';
import Prompt from './Prompt';
import { Avatar } from '@nextui-org/react';
import PromptCardIsLogged from './PromptCardIsLogged';
import GeminiIcon from '../icons/GeminiIcon';
import ChatMessages from './ChatMessages';
import { generateAIResponse } from '../utils/GeminiConfig';
import { addMessage, createChat } from '../service/chatService';
import { IS_LOGGED_PROMPT_FOUR, IS_LOGGED_PROMPT_ONE, IS_LOGGED_PROMPT_THREE, IS_LOGGED_PROMPT_TWO, PROMPT_FOUR_FIRST_LINE, PROMPT_FOUR_SECOND_LINE, PROMPT_ONE_FIRST_LINE, PROMPT_ONE_SECOND_LINE, PROMPT_THREE_FIRST_LINE, PROMPT_THREE_SECOND_LINE, PROMPT_TWO_FIRST_LINE, PROMPT_TWO_SECOND_LINE } from '../utils/constants';
import PencilIcon from '../icons/PencilIcon';
import StudyIcon from '../icons/StudyIcon';
import LightBulbIcon from '../icons/LightBulbIcon';
import TravelIcon from '../icons/TravelIcon';
import ToggleSidebarIcon from '../icons/ToggleSidebarIcon';

interface ChatboxProps {
    isLogged: boolean;
    userData: any | undefined;
    selectedChat: any;
    setSelectedChat: React.Dispatch<any>;
    setChats: React.Dispatch<any>;
    setMessages: React.Dispatch<any>;
    messages: any;
    toggleSidebar: () => void;
}

const Chatbox: React.FC<ChatboxProps> = ({ isLogged, userData, selectedChat, setSelectedChat, setChats, messages, setMessages, toggleSidebar }) => {
    const [isAILoading, setAILoading] = useState(false);

    const handleEnterClick = async (promptValue: string, image?: File | null) => {
        let content: string | Array<string> = promptValue;

        if (image) {
            const imageUrl = URL.createObjectURL(image);
            content = [promptValue, imageUrl];
        }

        const formData = new FormData();
        formData.append('content', promptValue);
        formData.append('sender', 'user');
        if (image) {
            formData.append('file', image);
        }

        const userMessage = {
            content,
            timestamp: new Date().toISOString(),
            sender: "user",
        };

        setMessages((prevMessages: any) => [...prevMessages, userMessage]);
        setAILoading(true);

        try {
            let currentChat = selectedChat;
            if (!currentChat && isLogged) {
                const chat = await createChat(userData[0]?.id);
                console.log(chat)
                currentChat = chat;
                setSelectedChat(chat);
                setChats((prevChats: any) => Array.isArray(prevChats) ? [...prevChats, { ...chat, messages: [userMessage] }] : [{ ...chat, messages: [userMessage] }]);
            }

            if (currentChat && currentChat.id) {
                await addMessage(currentChat.id, formData);
            }

            if (promptValue.trim()) {
                const aiResponse = await generateAIResponse(promptValue, image);
                setMessages((prevMessages: any) => [...prevMessages, aiResponse]);
                console.log("aiReponsde", aiResponse)
                if (currentChat && currentChat.id) {
                    await addMessage(currentChat.id, aiResponse);
                }
            }
        } catch (error) {
            console.error("Error occurred while generating AI response or sending message to backend:", error);
        } finally {
            setAILoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full items-center pb-2 justify-between h-full bg-white">
            <div className='h-16 p-5 mt-1.5 w-full flex items-center justify-between'>
                <span className='text-center cursor-pointer rounded-xl p-1 hover:bg-gray-200' onClick={toggleSidebar}>
                    <ToggleSidebarIcon />
                </span>
                {isLogged && <Avatar size='sm' src={userData && userData[0]?.avatar} />}
            </div>
            <div className={`${(messages?.length > 0 || (selectedChat && Object.keys(selectedChat).length > 0)) ? 'overflow-y-auto w-full h-full flex items-start justify-center' : ''}`}>
                {(messages?.length > 0 || (selectedChat && Object.keys(selectedChat).length > 0))
                    ? <>
                        <ChatMessages
                            messages={messages}
                            isAILoading={isAILoading}
                            selectedChat={selectedChat}
                            isLogged={isLogged}
                        />
                    </>
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
                                    <div className='grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4 px-3 md:w-[590px] xl:w-[700px]'>
                                        <PromptCardIsLogged
                                            selectCard={handleEnterClick}
                                            icon={<PencilIcon />}
                                            text={IS_LOGGED_PROMPT_ONE}
                                        />
                                        <PromptCardIsLogged
                                            selectCard={handleEnterClick}
                                            icon={<StudyIcon />}
                                            text={IS_LOGGED_PROMPT_TWO}
                                        />
                                        <PromptCardIsLogged
                                            selectCard={handleEnterClick}
                                            icon={<LightBulbIcon />}
                                            text={IS_LOGGED_PROMPT_THREE}
                                        />
                                        <PromptCardIsLogged
                                            selectCard={handleEnterClick}
                                            icon={<TravelIcon />}
                                            text={IS_LOGGED_PROMPT_FOUR}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='flex flex-col items-center justify-center px-2 gap-2 md:w-[590px] xl:w-[750px]'>
                                {!isLogged && (
                                    <div className='grid grid-cols-2 gap-2 w-full'>
                                        <PromptCard
                                            selectCard={handleEnterClick}
                                            firstLine={PROMPT_ONE_FIRST_LINE}
                                            secondLine={PROMPT_ONE_SECOND_LINE}
                                        />
                                        <PromptCard
                                            selectCard={handleEnterClick}
                                            firstLine={PROMPT_TWO_FIRST_LINE}
                                            secondLine={PROMPT_TWO_SECOND_LINE}
                                        />
                                        <PromptCard
                                            selectCard={handleEnterClick}
                                            firstLine={PROMPT_THREE_FIRST_LINE}
                                            secondLine={PROMPT_THREE_SECOND_LINE}
                                        />
                                        <PromptCard
                                            selectCard={handleEnterClick}
                                            firstLine={PROMPT_FOUR_FIRST_LINE}
                                            secondLine={PROMPT_FOUR_SECOND_LINE}
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
