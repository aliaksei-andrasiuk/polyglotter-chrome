import { Readability } from "@mozilla/readability";
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



async function translateWords(words, langFrom, langTo) {
    const response = await fetch("http://localhost:3000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: words.join(" "), langFrom, langTo })
    });

    const data = await response.json();
    return data.translated_text.split(" ");
}

function isVisible(node) {
    if (!node || !node.parentElement) return false;
    const style = window.getComputedStyle(node.parentElement);
    return (
        typeof node.nodeValue === 'string' &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0" &&
        node.parentElement.getBoundingClientRect().width > 0
    );
}
const nodeList = [];

const serializer = (node: Node) => {
    console.log('serializer node', node);
    nodeList.push(node);
    return node;
}

export async function processPageTranslation(percentage = 20) {
    // console.log('percentage', percentage);
    const article = new Readability(document.cloneNode(true) as Document).parse();
    // console.log('document', document.cloneNode(true));
    console.log('article', article);
    console.log('article.textContent', article.textContent);
    console.log('article.excerpt', article.excerpt);
// console.log('nodeList.', nodeList);

            // let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
            // let textNodes = [];

            // while (walker.nextNode()) {
            //     if (walker.currentNode.nodeValue.trim().length > 0) {
            //         textNodes.push(walker.currentNode);
            //     }
            // }

            // let allPhrases = [];
            // textNodes.forEach(node => {
            //     let phrases = node.nodeValue.match(/[^.!?]+[.!?]/g); // Разбиваем на предложения
            //     if (phrases) {
            //         phrases.forEach(phrase => allPhrases.push({ phrase, node }));
            //     }
            // });

            // let numToTranslate = Math.ceil(allPhrases.length * (percentage / 100));
            // let phrasesToTranslate = allPhrases.sort(() => 0.5 - Math.random()).slice(0, numToTranslate);

            // let phraseList = phrasesToTranslate.map(item => item.phrase);
            // console.log('phraseList', phraseList);

            // if (phraseList.length === 0) return;

            // let translations = await fetchTranslations(phraseList, language);
            // let translationMap = new Map(Object.entries(translations));

            // phrasesToTranslate.forEach(({ phrase, node }) => {
            //     let translatedText = translationMap.get(phrase) || phrase;
            //     node.nodeValue = node.nodeValue.replace(phrase, translatedText);
            // });

            


    // const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    //     acceptNode: (node) => {
    //         const parentTag = node.parentElement?.tagName.toLowerCase();

    //         if (["script", "style", "noscript", "iframe", "meta", "link", "pre", "code", "a"].includes(parentTag)) return NodeFilter.FILTER_REJECT;
    //         return isVisible(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    //     }
    // });
    // let textNodes = [];

    // while (walker.nextNode()) {
    //     let node = walker.currentNode;
    //     // console.log('node', node);
    //     // console.log('node.nodeName', node.nodeName);
    //     // console.log('node.nodeType', node.nodeType);
    //     // console.log('node.nodeValue', node.nodeValue);
    //     // console.log('node.textContent', node.textContent);
        
    //     if (node.nodeValue.trim()) {
    //         textNodes.push(node);
    //     }
    // }

    // let allWords = [];
    // let wordToNodeMap = new Map();
    
    // textNodes.forEach(node => {
    //     let words = node.nodeValue.split(/\b(\w+)\b/);
    //     words.forEach(word => {
    //         if (word.trim()) {
    //             allWords.push(word);
    //             wordToNodeMap.set(word, node);
    //         }
    //     });
    // });

    // let numToTranslate = Math.ceil((allWords.length * percentage) / 100);
    // let wordsToTranslate = allWords.sort(() => Math.random() - 0.5).slice(0, numToTranslate);

    // console.log('wordsToTranslate', wordsToTranslate);
    

    // let translatedWords = await translateWords(wordsToTranslate, "en", "pl");

    // wordsToTranslate.forEach((word, i) => {
    //     let node = wordToNodeMap.get(word);
    //     if (node) {
    //         node.nodeValue = node.nodeValue.replace(word, translatedWords[i]);
    //     }
    // });
}

// processPageTranslation(20);

