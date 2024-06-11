import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import NewChatIcon from '../icons/NewChatIcon';
import GeminiIcon from '../icons/GeminiIcon';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { deleteChats, getChats } from '../service/chatService';
import DeleteIcon from '../icons/DeleteIcon';
import { Chat } from '../types/types';
import ModalDeleteChat from './ModalDeleteChat';
import { groupChatsByDate } from '../utils/validations';
import ModalInit from './ModalInit';

interface SidebarProps {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    userData: any;
    setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
    chats: any[];
    setChats: React.Dispatch<React.SetStateAction<any>>;
    setMessages: any;
}

const Sidebar: React.FC<SidebarProps> = ({ isLogged, setIsLogged, userData, setSelectedChat, chats, setChats, setMessages }) => {
    const router = useRouter();
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [chatToDelete, setChatToDelete] = useState<Chat | null>(null);
    const [openLoginModal, setOpenLoginModal] = useState<boolean>(true);

    const createNewChat = () => {
        if (isLogged) {
            setSelectedChat(null);
            setMessages([]);
        } else {
            setOpenLoginModal(true);
        }
    }
    const getAllChats = async () => {
        const res = await getChats(userData[0]?.id);
        setChats(res);
    };

    useEffect(() => {
        getAllChats();
    }, []);

    const login = () => {
        router.push("http://localhost:4000/auth/google");
    };

    const logout = () => {
        Cookies.remove('jwt');
        router.refresh();
        router.replace('/');
        setIsLogged(false);
        setSelectedChat(null);
        setChats(null);
    };

    const handleDeleteClick = (chat: Chat) => {
        setChatToDelete(chat);
        setOpenDeleteModal(true);
    };

    const confirmDeleteChat = async (id: number) => {
        try {
            await deleteChats(id);
            setChats((prevChats: any) => prevChats.filter((chat: any) => chat.id !== id));
            setSelectedChat(null);
            setOpenDeleteModal(false);
            setMessages([]);
        } catch (error) {
            console.error('Failed to delete chat:', error);
        }
    };

    const groupedChats = groupChatsByDate(chats);

    for (const key in groupedChats) {
        if (Object.hasOwnProperty.call(groupedChats, key)) {
            groupedChats[key].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
    }
    return (
        <div className='flex flex-col h-full justify-between w-[320px] lg:w-[260px] bg-gray-100 py-4 px-3 text-sm'>
            <ModalDeleteChat
                setOpenDeleteModal={setOpenDeleteModal}
                openDeleteModal={openDeleteModal}
                confirmDeleteChat={confirmDeleteChat}
                chatToDelete={chatToDelete}
            />
            {openLoginModal && !isLogged &&
            <ModalInit 
            openLoginModal={openLoginModal}
            setOpenLoginModal={setOpenLoginModal}
            />}
            <div>
                <div className='flex items-center justify-between hover:bg-gray-200 py-3 p-2 rounded-xl cursor-pointer' onClick={createNewChat}>
                    <div className='flex items-center gap-2'>
                        <GeminiIcon
                            color='#6b7280'
                            width='20'
                            height='20'
                        />
                        <p className='font-semibold text-sm'>Nuevo chat</p>
                    </div>
                    <NewChatIcon />
                </div>
                <div className='mt-2 overflow-y-auto max-h-screen-minus-50'>
                    {isLogged && Object?.keys(groupedChats)?.map((dateLabel) => (
                        <div key={dateLabel}>
                            <p className='text-gray-400 font-semibold px-3 my-2 text-xs'>{dateLabel}</p>
                            {groupedChats[dateLabel].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((chat: any) => (
                                <div
                                    key={chat.id}
                                    className='flex items-center justify-between p-3 hover:bg-gray-200 rounded-xl cursor-pointer'
                                    onMouseEnter={() => setHoveredIndex(chat.id)}
                                    onMouseLeave={() => setHoveredIndex(-1)}
                                    onClick={() => setSelectedChat(chat)}
                                >
                                    <p>{chat?.messages[0]?.content || chat?.message?.content}</p>
                                    {hoveredIndex === chat.id && (
                                        <span onClick={(e) => { e.stopPropagation(); handleDeleteClick(chat); }}>
                                            <DeleteIcon />
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {!isLogged ? (
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>Iniciar sesión</p>
                    <p className='text-gray-400 text-[12px]'>Obtén respuestas más inteligentes, carga archivos e imágenes, y más.</p>
                    <Button size='sm' className='h-9 text-[13px] font-semibold' color='primary' onPress={login}>Iniciar sesión</Button>
                </div>
            ) : (
                <Button size='sm' className='h-9 text-[13px] font-semibold text-white' color='danger' onClick={logout}>Cerrar Sesión</Button>
            )}
        </div>
    );
};

export default Sidebar;
