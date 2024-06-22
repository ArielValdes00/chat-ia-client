import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import AttachIcon from '../icons/AttachIcon';

interface PromptProps {
    isLogged: boolean;
    onSendMessage: (message: string, image: File | null) => void; 
}

const Prompt: React.FC<PromptProps> = ({ isLogged, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim() || selectedImage !== null) {
            onSendMessage(message, selectedImage);
            setMessage('');
            setSelectedImage(null);
        }
    };    

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleAttachClick = () => {
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        fileInput.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <div className="relative">
            <div className={`${selectedImage ? "bg-gray-100" : "bg-white"} flex flex-col items-start rounded-xl p-2 mb-2`}>
                {selectedImage && (
                    <div className="relative ms-4 group">
                        <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Selected"
                            className="h-14 w-14 object-cover rounded-lg"
                        />
                        <button
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 bg-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                            ×
                        </button>
                    </div>
                )}
                <Input
                    fullWidth={true}
                    size='lg'
                    disableAnimation={true}
                    radius={isLogged ? 'full' : 'lg'}
                    className={`${!selectedImage && "rounded-full placeholder:text-sm"} shadow-none`}
                    variant={!selectedImage ? (isLogged ? 'flat' : 'bordered') : 'flat'}
                    placeholder='Envía un mensaje a Gemini'
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    startContent={isLogged && (
                        <AttachIcon onClick={handleAttachClick} />
                    )}
                    endContent={
                        <Button isIconOnly size='sm' color="primary" aria-label="Send" radius={isLogged ? 'full' : 'lg'} onClick={handleSend}>
                            <ArrowUpIcon />
                        </Button>
                    }
                    classNames={{
                        inputWrapper: [
                            `shadow-none ${!selectedImage &&
                            "border border-1 group-data-[focus=true]:border-primary hover:border-gray-100 placeholder:text-sm"
                            }`,
                        ],
                        input: [
                            `shadow-none ${!selectedImage &&
                            "px-1 placeholder:text-sm"
                            }`,
                        ]
                    }}
                />
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default Prompt;
