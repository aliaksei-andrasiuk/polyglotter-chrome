import { TRANSLATED_ITEM_CLASSNAME } from "./core.constants";
import { ITranslatedItems } from "./types";
import { createTranslationElement, processInitialPage } from "./utils";

const WORD = '[\\p{L}\\p{N}_]';

export const replaceTranslatedContent = (translations: ITranslatedItems[]) => {
    const { textNodes } = processInitialPage();

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
    if (escapedWords.length === 0) return;

    const pattern = new RegExp(`(?<!${WORD})(${escapedWords.join("|")})(?!${WORD})`, "giu");

    for (const node of textNodes) {
        const parent = node.parentElement;
        if (!parent || parent.classList.contains(TRANSLATED_ITEM_CLASSNAME)) continue;

        const text = node.nodeValue;
        if (!text) continue;

        let match: RegExpExecArray | null;
        const ranges: { start: number; end: number; originalLine: string; translatedLine: string }[] = [];

        while ((match = pattern.exec(text)) !== null) {
            const originalLine = match[1].toLowerCase();
            const translatedLine = translationMap.get(originalLine);
            if (!translatedLine) continue;

            ranges.push({
                start: match.index,
                end: match.index + match[0].length,
                originalLine,
                translatedLine,
            });
        }

        if (ranges.length === 0) continue;

        const fragment = document.createDocumentFragment();
        let lastIndex = 0;

        for (const { start, end, originalLine, translatedLine } of ranges) {
            if (start > lastIndex) {
                fragment.appendChild(document.createTextNode(text.slice(lastIndex, start)));
            }
            const element = createTranslationElement({ originalLine, translatedLine });
            fragment.appendChild(element);
            lastIndex = end;
        }

        if (lastIndex < text.length) {
            fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
        }

        node.replaceWith(fragment);
    }
};
