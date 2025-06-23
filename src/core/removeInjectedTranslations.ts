export const removeInjectedTranslations = () => {
    const translatedElements = document.querySelectorAll('.translated-item');

    translatedElements.forEach((el) => {
        const original = el.getAttribute('data-original-line');

        if (original !== null) {
            const textNode = document.createTextNode(original);
            el.replaceWith(textNode);
        }
    });
};
