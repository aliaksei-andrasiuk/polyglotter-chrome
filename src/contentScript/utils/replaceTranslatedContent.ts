import { MouseEvent } from "react";
import { MessageType } from "../types";

interface ITranslatedItems {
    originalLine: string;
    translatedLine: string;
}

export const replaceTranslatedContent = (translatedItems: ITranslatedItems[]) => {
    findAndReplaceText(translatedItems);
}

function findAndReplaceText(translations: ITranslatedItems[]) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];

    while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (node.nodeValue?.trim().length > 0) {
            textNodes.push(node);
        }
    }

    let fullText = "";
    const indexMapping: { index: number; node: Text }[] = [];

    textNodes.forEach(node => {
        indexMapping.push({ index: fullText.length, node });
        fullText += node.nodeValue + " ";
    });

    fullText = fullText.toLowerCase();

    const translationMap = new Map<string, string>();
    for (const { originalLine, translatedLine } of translations) {
        const normalized = originalLine.toLowerCase();
        if (!translationMap.has(normalized)) {
            translationMap.set(normalized, translatedLine);
        }
    }

    const escapedWords = [...translationMap.keys()].map(w =>
        w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const pattern = new RegExp(`\\b(${escapedWords.join('|')})\\b`, 'gi');

    let match: RegExpExecArray | null;
    while ((match = pattern.exec(fullText)) !== null) {
        const original = match[1].toLowerCase();
        const translated = translationMap.get(original);
        if (!translated) continue;

        const startIndex = match.index;
        const endIndex = startIndex + match[0].length;

        let startNode: Text | null = null,
            endNode: Text | null = null;
        let startOffset = 0,
            endOffset = 0;

        for (let i = 0; i < indexMapping.length; i++) {
            const { index, node } = indexMapping[i];
            const nextIndex = indexMapping[i + 1]?.index ?? fullText.length;

            if (startIndex >= index && startIndex < nextIndex) {
                startNode = node;
                startOffset = startIndex - index;
            }

            if (endIndex > index && endIndex <= nextIndex) {
                endNode = node;
                endOffset = endIndex - index;
                break;
            }
        }

        if (!startNode || !endNode) continue;

        if (
            startNode.parentElement?.classList.contains('pl-en-translation') ||
            endNode.parentElement?.classList.contains('pl-en-translation')
        ) {
            continue;
        }

        const range = document.createRange();
        range.setStart(startNode, Math.min(startOffset, startNode.nodeValue!.length));
        range.setEnd(endNode, Math.min(endOffset, endNode.nodeValue!.length));

        const span = document.createElement("span");
        span.textContent = translated;
        span.style.backgroundColor = "yellow";
        span.style.cursor = "pointer";
        span.className = "pl-en-translation";

        addPopupListener(span, match[1]);

        range.deleteContents();
        range.insertNode(span);
    }
}

export const addPopupListener = (element: HTMLSpanElement, originalLine: string) => {
    const uniqueId = Math.random().toString(24).substr(2, 9);

    const action = (event: any) => {
        const { top, left } = event.target.getBoundingClientRect();

        window.postMessage({
            type: MessageType.SHOW_TRANSLATION_POPUP,
            payload: {
                left: left + window.scrollX,
                top: top + window.scrollY,
                width: event.target.offsetWidth,
                height: event.target.offsetHeight,
                originalLine,
            }
        }, '*');
    }

    element.addEventListener('mouseenter', action);
    element.addEventListener('click', action);

    element.addEventListener('mouseleave', () => {
        window.postMessage({
            type: MessageType.HIDE_TRANSLATION_POPUP,
        }, '*');
    });

    element.id = uniqueId;
}
