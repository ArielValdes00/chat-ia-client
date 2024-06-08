import { Button } from '@nextui-org/react'
import React from 'react'
import NewChatIcon from '../icons/NewChatIcon';
import GeminiIcon from '../icons/GeminiIcon';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface SidebarProps {
    isLogged: boolean;
    setIsLogged: React.Dispatch<boolean>;
}

const Sidebar: React.FC<SidebarProps> = ({ isLogged, setIsLogged }) => {
    const router = useRouter();

    const login = () => {
        router.push("http://localhost:4000/auth/google");
    }

    const logout = () => {
        Cookies.remove('jwt');
        router.refresh();
        router.replace('/');
        setIsLogged(false);
    }

    return (
        <div className='flex flex-col justify-between w-[260px] bg-gray-100 h-full py-4 px-3 text-sm'>
            <div className='flex items-center justify-between hover:bg-gray-200 py-3 p-2 rounded-xl cursor-pointer'>
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
            {!isLogged ? (
                <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>Suscribirse o iniciar sesión</p>
                    <p className='text-gray-400 text-[12px]'>Obtén respuestas más inteligentes, carga archivos e imágenes, y más.</p>
                    <Button size='sm' className='h-9 text-[13px] font-semibold' color='primary'>Suscribirse</Button>
                    <Button size='sm' className='h-9 text-[13px] bg-white border font-semibold border-gray-300' onClick={login}>Iniciar sesión</Button>
                </div>
            ) : (
                <Button size='sm' className='h-9 text-[13px] font-semibold' color='danger' onClick={logout}>Cerrar Sesión</Button>
            )}
        </div>
    )
}

export default Sidebar