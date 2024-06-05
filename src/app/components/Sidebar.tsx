import { Button } from '@nextui-org/react'
import React from 'react'

interface SidebarProps {
    isLogged: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isLogged }) => {
    return (
        <div className='flex flex-col justify-between w-[316px] bg-gray-100 h-full py-5 px-3 text-sm'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                    <span>LOGO</span>
                    <p className='font-semibold'>Nuevo chat</p>
                </div>
                <span>Icon</span>
            </div>
            <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Suscribirse o iniciar sesión</p>
                <p className='text-gray-400 text-[12px]'>Obtén respuestas más inteligentes, carga archivos e imágenes, y más.</p>
                <Button size='sm' className='h-9 text-[13px] font-semibold' color='primary'>Suscribirse</Button>
                <Button size='sm' className='h-9 text-[13px] bg-white border font-semibold border-gray-300'>Iniciar sesión</Button>
            </div>
        </div>
    )
}

export default Sidebar