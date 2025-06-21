const TRASH_REGEX = /^[\s\p{P}\p{S}\p{N}]+$/u;

export const processInitialPage = () => {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
    );

    const textNodes: Text[] = [];

    while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const value = node.nodeValue?.trim();

        if (!value || TRASH_REGEX.test(value)) continue;

        textNodes.push(node);
    }

    return { textNodes };
};