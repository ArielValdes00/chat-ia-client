import { Chat } from "../types/types";

export function formatText(text: string) {
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    text = text.replace(/^\* (.+)$/gm, '<li>$1</li>');

    text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

    text = text.replace(/:/g, ':<br>');

    text = text.replace(/-/g, '&nbsp;&nbsp;-');

    return text;
}

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;

    const diffTime = now.getTime() - date.getTime();
    
    if (diffTime < oneDay) {
        return 'Hoy';
    } else if (diffTime < 2 * oneDay) {
        return 'Ayer';
    } else if (diffTime < oneWeek) {
        const daysAgo = Math.floor(diffTime / oneDay);
        return `Hace ${daysAgo} días`;
    } else if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
        return 'El mes pasado';
    } else if (date.getFullYear() === now.getFullYear()) {
        const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        return monthNames[date.getMonth()];
    } else {
        return `El año ${date.getFullYear()}`;
    }
};

export const groupChatsByDate = (chats: Chat[]) => {
    return chats?.reduce((acc, chat) => {
        const dateLabel = formatDate(chat.createdAt);
        if (!acc[dateLabel]) {
            acc[dateLabel] = [];
        }
        acc[dateLabel].push(chat);
        return acc;
    }, {} as Record<string, Chat[]>);
};

export const truncateText = (text: string, maxLength = 26) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + "...";
};

export const capitalizeText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
