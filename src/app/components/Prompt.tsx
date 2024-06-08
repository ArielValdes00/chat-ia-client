import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import AttachIcon from '../icons/AttachIcon';

interface PromptProps {
    isLogged: boolean;
    onSendMessage: (message: string) => void; 
}

const Prompt: React.FC<PromptProps> = ({ isLogged, onSendMessage }) => {
    const [message, setMessage] = useState(''); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Input
            fullWidth={true}
            size='lg'
            radius={isLogged ? 'full' : 'lg'}
            className='rounded-full placeholder:text-sm'
            variant={isLogged ? 'flat' : 'bordered'}
            placeholder='Envía un mensaje a Gemini'
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            startContent={isLogged && <AttachIcon />}
            endContent={
                <Button isIconOnly size='sm' color="primary" aria-label="Send" radius={isLogged ? 'full' : 'lg'} onClick={handleSend}>
                    <ArrowUpIcon />
                </Button>
            }
            classNames={{
                inputWrapper: [
                    "border border-1 group-data-[focus=true]:border-primary",
                    "hover:border-gray-100",
                    "placeholder:text-sm",
                ],
                input: [
                    "px-1 placeholder:text-sm"
                ]
            }}
        />
    );
};

export default Prompt;
