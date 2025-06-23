import { isProbablyReaderable, Readability } from '@mozilla/readability';

export const getArticleText = () => {
    const readable = isProbablyReaderable(document);

    if (readable) {
        const article = new Readability(document.cloneNode(true) as Document).parse();

        return article.textContent;
    }

    return null;
};
