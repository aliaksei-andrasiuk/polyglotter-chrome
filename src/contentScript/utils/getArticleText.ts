import { isProbablyReaderable, Readability } from "@mozilla/readability";

export const getArticleText = () => {
    const readable = isProbablyReaderable(document);

    if (readable) {
        const article = new Readability(document.cloneNode(true) as Document).parse();
        console.log("Extracted content:", article);

        return article.textContent;
    }

    throw new Error("No article found");
};


