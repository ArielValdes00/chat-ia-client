"use client"
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Chatbox from "./components/Chatbox";
import Sidebar from "./components/Sidebar";
import { getUser } from "./service/authService";
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
        const getUserById = async () => {
            const res = await getUser();
            if (res === undefined || (res >= 400)) {
                setIsLogged(false);
            } else {
                setUserData(res);
                setIsLogged(true);
            }
            setIsAuthChecked(true);
            setLoading(false);
        }
        getUserById();
    }, []);

    return (
        <main className="h-screen flex sm:px-0">
            {loading && <Loading />}
            {!loading && isAuthChecked && !isLogged && <ModalInit />}
            {!loading && isAuthChecked && (
                <>
                    <motion.aside
                        className={`sidebar ${!isSidebarOpen && 'hidden'}`}
                        variants={sidebarVariants}
                        animate={isSidebarOpen ? 'open' : 'closed'}
                    >
                        <Sidebar isLogged={isLogged} setIsLogged={setIsLogged} />
                    </motion.aside>
                    <Chatbox isLogged={isLogged} userData={userData} />
                </>
            )}
        </main>
    );
}
