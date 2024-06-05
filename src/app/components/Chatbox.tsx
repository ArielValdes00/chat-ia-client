import React from 'react';
import PromptCard from './PromptCard';
import Prompt from './Prompt';
import { Avatar } from '@nextui-org/react';
import PromptCardIsLogged from './PromptCardIsLogged';

interface ChatboxProps {
    isLogged: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({ isLogged }) => {
    return (
        <div className="flex flex-col w-full items-center pb-5 justify-between h-full bg-white">
            <div className='h-16 px-5 w-full flex items-center justify-end'>
                {isLogged && <Avatar size='sm' src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />}
            </div>
            <div className='flex flex-col gap-4 items-center'>
                <p className='text-center'>LOGO</p>
                {!isLogged && <p className='font-semibold text-2xl'>¿Cómo puedo ayudarte hoy?</p>}
                {isLogged && (
                    <div className='flex items-center mx-auto justify-center gap-4 w-[65%]'>
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
            <div className='flex flex-col gap-2 w-[68%]'>
                {!isLogged && (
                    <div className='grid grid-cols-2 gap-2'>
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
                <Prompt isLogged={isLogged} />
            </div>
        </div>
    );
};

export default Chatbox;
