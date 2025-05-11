interface ITranslatedItems {
    originalLine: string;
    translatedLine: string;
}

export const replaceTranslatedContent = (translatedItems: ITranslatedItems[]) => {
    findAndReplaceText(translatedItems);
}

function findAndReplaceText(translations: ITranslatedItems[]) {
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let textNodes: Node[] = [];

    // 1️⃣ Collect all text nodes
    while (walker.nextNode()) {
        if (walker.currentNode.nodeValue?.trim().length > 0) {
            textNodes.push(walker.currentNode);
        }
    }

    // 2️⃣ Combine text nodes into a single string with positional mapping
    let fullText = "";
    let indexMapping: { index: number; node: Node }[] = [];

    textNodes.forEach((node, index) => {
        indexMapping.push({ index: fullText.length, node });
        fullText += node.nodeValue + " "; // Space preserves readability
    });

    // 3️⃣ Iterate over all translation items
    translations.forEach(({ originalLine, translatedLine }) => {
        let searchIndex = fullText.indexOf(originalLine);
        if (searchIndex === -1) return; // Skip if not found

        // 4️⃣ Determine the affected text nodes and positions
        let startNode: Node | null = null, endNode: Node | null = null;
        let startOffset = 0, endOffset = 0;
        let selectedNodes: Node[] = [];

        for (let i = 0; i < indexMapping.length; i++) {
            let { index, node } = indexMapping[i];
            let nextIndex = indexMapping[i + 1] ? indexMapping[i + 1].index : fullText.length;

            if (searchIndex >= index && searchIndex < nextIndex) {
                startNode = node;
                startOffset = searchIndex - index;
            }

            if (searchIndex + originalLine.length > index && searchIndex + originalLine.length <= nextIndex) {
                endNode = node;
                endOffset = searchIndex + originalLine.length - index;
                break;
            }

            if (startNode) selectedNodes.push(node);
        }

        if (!startNode || !endNode) return;

        // 5️⃣ Replace text in affected nodes
        let range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);

        let span = document.createElement("span");
        span.textContent = translatedLine;
        span.style.backgroundColor = "yellow"; // Optional: Style replaced text

        range.deleteContents();
        range.insertNode(span);
    });
}
