import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ModalInit = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const router = useRouter();
    
    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const login = () => {
        router.push("http://localhost:4000/auth/google");
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={toggleModal}>
            <ModalContent className='flex flex-col items-center justify-center'>
                {(onClose) => (
                    <>
                        <ModalHeader></ModalHeader>
                        <ModalBody className='text-center'>
                            <strong className='text-lg'>Inicia sesión para acceder a funcionalidades avanzadas: </strong>
                            <p className='text-[14px]'>Respuestas más inteligentes y precisas,
                                Carga y procesamiento de archivos e imágenes,
                                Almacenamiento de tus chats para futuras referencias.</p>
                        </ModalBody>
                        <ModalFooter className='w-full flex flex-col items-center'>
                            <Button fullWidth={true} color="primary" onPress={login}>
                                Iniciar Sesión
                            </Button>
                            <button className='text-xs mt-1 text-gray-700 hover:underline' onClick={onClose}>
                                Continuar como invitado
                            </button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalInit