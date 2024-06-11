export interface Message {
    chatId: number;
    content: string;
    createdAt: string;
    id: number;
    sender: string;
    updatedAt: string;
    uuid: string;
}

export interface Chat {
    filter(arg0: (chat: Chat) => boolean): unknown;
    createdAt: string;
    id: number;
    messages: Message[];
    updatedAt: string;
    userId: number;
    uuid: string;
}