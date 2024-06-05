import { Button, Input } from '@nextui-org/react'
import React from 'react'
import ArrowUpIcon from '../icons/ArrowUpIcon'
import AttachIcon from '../icons/AttachIcon'

interface PromptProps {
    isLogged: boolean
}

const Prompt: React.FC<PromptProps> = ({ isLogged }) => {
    return (
        <Input
            fullWidth={true}
            size='lg'
            radius={isLogged ? 'full' : 'lg'}
            className='rounded-full placeholder:text-sm'
            variant={isLogged ? 'flat' : 'bordered'}
            placeholder='Envía un mensaje a Gemini'
            startContent={isLogged && <AttachIcon />}
            endContent={
                <Button isIconOnly size='sm' color="primary" aria-label="Send" radius={isLogged ? 'full' : 'lg'}>
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
    )
}

export default Prompt
