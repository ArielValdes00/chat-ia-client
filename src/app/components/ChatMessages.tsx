import { Avatar } from '@nextui-org/react';
import React from 'react';
import { formatText } from '../utils/validations';

interface ChatMessagesProp {
    messages: any;
    isAILoading: boolean;
    selectedChat: any;
    isLogged: boolean;
    chats: any
}

const ChatMessages: React.FC<ChatMessagesProp> = ({ messages, isAILoading, selectedChat, isLogged,chats }) => {
    const filteredChat = chats?.find((chat: any) => chat?.id === selectedChat?.id);

    const renderMessages = () => {
        if (isLogged && selectedChat && selectedChat.messages) {
            return selectedChat?.messages?.map((msg: any, index: number) => (
                <div
                    key={index}
                    className="clear-both my-4"
                >
                    <div className='flex items-start'>
                        {msg.sender !== 'user' && <Avatar src='./avatarAi.png' className="float-left" />}
                        <div
                            className={`px-4 break-words py-2 ${msg.sender === 'user'
                                ? 'bg-blue-500 text-white ml-auto text-end rounded-xl max-w-4/6'
                                : 'float-left w-full'
                                }`}
                        >
                            <div dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} />
                        </div>
                    </div>
                </div>
            ));
        } else {
            return messages?.map((msg: any, index: number) => (
                <div
                    key={index}
                    className="clear-both my-4"
                >
                    <div className='flex items-start'>
                        {msg.sender !== 'user' && <Avatar src='./avatarAi.png' className="float-left" />}
                        <div
                            className={`px-4 break-words py-2 ${msg.sender === 'user'
                                ? 'bg-blue-500 text-white ml-auto text-end rounded-xl max-w-4/6'
                                : 'float-left w-full'
                                }`}
                        >
                            <div dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} />
                        </div>
                    </div>
                </div>
            ));
        }
    };
    return (
        <div className="w-full md:w-[610px] xl:w-[770px] px-4">
            {selectedChat && selectedChat.messages ? renderMessages()
                : (
                    messages?.map((msg: any, index: number) => (
                        <div
                            key={index}
                            className="clear-both my-4"
                        >
                            <div className='flex items-start'>
                                {msg.sender !== 'user' && <Avatar src='./avatarAi.png' className="float-left" />}
                                <div
                                    className={`px-4 break-words py-2 ${msg.sender === 'user'
                                        ? 'bg-blue-500 text-white ml-auto text-end rounded-xl max-w-4/6'
                                        : 'float-left w-full'
                                        }`}
                                >
                                    <div dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            <div className="clear-both" />
            {isAILoading && (
                <div className='flex items-center gap-4 mt-4'>
                    <Avatar src='./avatarAi.png' />
                    <div className='flex gap-1'>
                        <div className='h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-2 w-2 bg-primary rounded-full animate-bounce'></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatMessages;
