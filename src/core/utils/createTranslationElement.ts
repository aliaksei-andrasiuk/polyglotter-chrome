import { TRANSLATED_ITEM_CLASSNAME } from '../core.constants';
import { ITranslatedItems, MessageType } from '../types';

export const createTranslationElement = ({ originalLine, translatedLine }: ITranslatedItems): HTMLSpanElement => {
    const span = document.createElement('span');
    span.textContent = translatedLine;
    span.style.backgroundColor = 'yellow';
    span.style.cursor = 'pointer';
    span.className = TRANSLATED_ITEM_CLASSNAME;
    span.dataset.originalLine = originalLine;

    addPopupListener(span, originalLine);

    return span;
};

const addPopupListener = (element: HTMLSpanElement, originalLine: string) => {
    const uniqueId = Math.random().toString(24).substr(2, 9);

    const action = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const { top, left } = target.getBoundingClientRect();

        window.postMessage(
            {
                type: MessageType.SHOW_TRANSLATION_POPUP,
                payload: {
                    left: left + window.scrollX,
                    top: top + window.scrollY,
                    width: target.offsetWidth,
                    height: target.offsetHeight,
                    originalLine
                }
            },
            '*'
        );
    };

    element.addEventListener('mouseenter', action);
    element.addEventListener('click', action);

    element.addEventListener('mouseleave', () => {
        window.postMessage(
            {
                type: MessageType.HIDE_TRANSLATION_POPUP
            },
            '*'
        );
    });

    element.id = uniqueId;
};
