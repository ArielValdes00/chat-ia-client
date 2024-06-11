import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { Chat } from '../types/types';

interface ModalDeleteChatProps {
    openDeleteModal: boolean;
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    confirmDeleteChat: (id: number) => void;
    chatToDelete: Chat | null;
}

const ModalDeleteChat: React.FC<ModalDeleteChatProps> = ({ openDeleteModal, setOpenDeleteModal, confirmDeleteChat, chatToDelete }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!openDeleteModal) {
            setIsLoading(false);
        }
    }, [openDeleteModal]);

    const handleDeleteChat = () => {
        setIsLoading(true);
        if (chatToDelete) {
            confirmDeleteChat(chatToDelete.id);
        }
    };

    return (
        <Modal isOpen={openDeleteModal} onOpenChange={() => setOpenDeleteModal(false)}>
            <ModalContent className='flex flex-col items-center justify-center'>
                <ModalHeader>¿Deseas eliminar el chat?</ModalHeader>
                <ModalBody className='text-center'>
                    <p className='text-[14px]'>Esta acción no se puede deshacer.</p>
                </ModalBody>
                <ModalFooter className='w-full max-w-xs flex flex-col items-center'>
                    <Button
                        fullWidth={true}
                        isLoading={isLoading}
                        className='text-white'
                        color="danger"
                        onPress={handleDeleteChat}
                    >
                        {isLoading ? '' : 'Eliminar'}
                    </Button>
                    <button className='text-xs mt-1 text-gray-700 hover:underline' onClick={() => setOpenDeleteModal(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalDeleteChat;
