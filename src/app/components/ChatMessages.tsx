import { Avatar, Image } from '@nextui-org/react';
import React, { useEffect, useRef } from 'react';
import { formatText } from '../utils/validations';

interface ChatMessagesProp {
    messages: any;
    isAILoading: boolean;
    selectedChat: any;
    isLogged: boolean;
}

const ChatMessages: React.FC<ChatMessagesProp> = ({ messages, isAILoading, selectedChat, isLogged }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            scrollToBottom();
        }, 0);

        return () => clearTimeout(timeout);
    }, [messages, selectedChat]);

    const renderMessageContent = (content: any) => {
        if (!Array.isArray(content) || content.length !== 2) {
            return { isImage: false, content: <p className='leading-8' dangerouslySetInnerHTML={{ __html: formatText(content) }}></p> };
        }

        const textContent = content[0];
        const imageUrl = content[1];

        if (imageUrl) {
            return {
                isImage: true,
                content: (
                    <div className='max-w-lg'>
                        <Image src={imageUrl} alt="chat image" radius='sm' className='h-auto bg-white z-0 w-auto'/>
                        {textContent && <p className='px-2 py-1 max-w-md text-start w-auto' dangerouslySetInnerHTML={{ __html: formatText(textContent) }}></p>}
                    </div>
                )
            };
        } else {
            return {
                isImage: false,
                content: <p dangerouslySetInnerHTML={{ __html: formatText(textContent) }}></p>
            };
        }
    };

    const renderMessages = () => {
        if (isLogged && selectedChat && selectedChat.messages) {
            return selectedChat?.messages?.map((msg: any, index: number) => {
                const { isImage, content } = renderMessageContent(msg.content);
                return (
                    <div
                        key={index}
                        className="clear-both my-4"
                    >
                        <div className='flex items-start'>
                            {msg.sender !== 'user' && <Avatar src='./avatarAi.png' className="float-left"/>}
                            <div
                                className={`break-words ${isImage ? 'p-[1.9px]' : 'px-4 py-2'} ${msg.sender === 'user'
                                    ? 'bg-blue-500 text-white ml-auto text-end rounded-lg max-w-md'
                                    : 'float-left w-full'
                                    }`}
                            >
                                {content}
                            </div>
                        </div>
                    </div>
                );
            });
        } else {
            return messages?.map((msg: any, index: number) => {
                const { isImage, content } = renderMessageContent(msg.content);
                return (
                    <div
                        key={index}
                        className="clear-both my-4"
                    >
                        <div className='flex items-start'>
                            {msg.sender !== 'user' && <Avatar src='./avatarAi.png' className="float-left" />}
                            <div
                                className={`break-words ${isImage ? 'p-1' : 'px-4 py-2'} ${msg.sender === 'user'
                                    ? 'bg-blue-500 text-white ml-auto text-end rounded-xl max-w-4/6'
                                    : 'float-left w-full'
                                    }`}
                            >
                                {content}
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };

    return (
        <div className="w-full md:w-[610px] xl:w-[770px] px-4">
            {renderMessages()}
            <div ref={messagesEndRef} />
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
