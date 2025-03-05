import { MessageType } from "../types";

export const fillParagraphs = () => {
    const paragraphs = document.querySelectorAll('p')
    
    for (let index = 0; index < paragraphs.length; index++) {
        const isSelectableParagraph = paragraphs[index].dataset.selectableParagraph === '';

        if (isSelectableParagraph) {
            const uniqueId = Math.random().toString(24).substr(2, 9);
    
            const translatedItemWrapper = document.createElement('span');
            translatedItemWrapper.addEventListener('mouseenter', (event: any) => {
                
                window.postMessage({
                    type: MessageType.TRANSLATED_ELEMENT_MOUSE_ENTER,
                    payload: {
                        left: event.target.offsetLeft,
                        top: event.target.offsetTop,
                        width: event.target.offsetWidth,
                        height: event.target.offsetHeight
                    }
                }, '*');
            });

            translatedItemWrapper.addEventListener('mouseleave', () => {
                window.postMessage({
                    type: MessageType.TRANSLATED_ELEMENT_MOUSE_LEAVE,
                }, '*');
            });

            translatedItemWrapper.style.backgroundColor = 'darkseagreen';
            translatedItemWrapper.style.position = 'relative';
            translatedItemWrapper.id = uniqueId;
    
            const shadowRoot = translatedItemWrapper.attachShadow({ mode: 'open' });
    
            const translatedItem = document.createElement('span');
            translatedItem.textContent = 'TEST WORD';
    
            shadowRoot.appendChild(translatedItem);
    
            paragraphs[index].appendChild(translatedItemWrapper);
        }
    }
}
