"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Chatbox from "./components/Chatbox";
import Sidebar from "./components/Sidebar";
import { getUser, verifySession } from "./service/authService";
import Loading from "./Loading";
import ModalInit from './components/ModalInit';

const sidebarVariants = {
    open: {
        x: 0,
        opacity: 1,
        display: 'block',
        transition: { type: 'tween', duration: 0.5 }
    },
    closed: {
        x: '-100%',
        opacity: 0,
        transition: { type: 'tween', duration: 0.5 },
        transitionEnd: { display: 'none' }
    }
};

export default function Home() {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [userData, setUserData] = useState<any | undefined>([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [selectedChat, setSelectedChat] = useState<any>(null);
    const [chats, setChats] = useState<any[]>([]);
    const [messages, setMessages] = useState<any>([]);
    const [userId, setUserId] = useState<any>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 840) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
            setLoading(false);
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [loading]);


    useEffect(() => {
        const checkSession = async () => {
            const result = await verifySession();
            if (result?.session) {
                setIsLogged(true);
                setUserId(result.user)
            } else {
                setIsLogged(false);
            }
            setIsAuthChecked(true);
        };
        setLoading(false);
        checkSession();
    }, []);

    useEffect(() => {
        if (userId) {
            const getUserById = async () => {
                const res = await getUser(userId);
                if (res) {
                    setUserData(res);
                }
            };
            getUserById();
        }
    }, [isLogged]);

    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <main className="h-screen flex sm:px-0 relative">
            {!loading && isAuthChecked && !isLogged && <ModalInit />}
            {!loading && isAuthChecked && (
                <>
                    <motion.aside
                        className={`sidebar ${isSidebarOpen ? 'block' : 'hidden'} lg:block bg-gray-100 lg:static absolute z-20 h-full`}
                        variants={sidebarVariants}
                        animate={isSidebarOpen ? 'open' : 'closed'}
                    >
                        <Sidebar
                            isLogged={isLogged}
                            setIsLogged={setIsLogged}
                            userData={userData}
                            setSelectedChat={setSelectedChat}
                            chats={chats}
                            setChats={setChats}
                            setMessages={setMessages}
                        />
                    </motion.aside>
                    {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={toggleSidebar}></div>}
                    <div className="flex-1">
                        <Chatbox
                            isLogged={isLogged}
                            userData={userData}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                            setChats={setChats}
                            messages={messages}
                            setMessages={setMessages}
                            toggleSidebar={toggleSidebar}
                        />
                    </div>
                </>
            )}
        </main>
    );
}
