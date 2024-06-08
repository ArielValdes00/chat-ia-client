export function formatText(text: string) {
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    text = text.replace(/^\* (.+)$/gm, '<li>$1</li>');

    text = text.replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');

    text = text.replace(/:/g, ':<br>');

    text = text.replace(/-/g, '&nbsp;&nbsp;-');

    return text;
}
