import React, { FC } from "react";
import ReactShadowRoot from "react-shadow-root";
import { TranslationPopup } from "./components";
import { useSetupContent } from "./hooks/useSetupContent";

chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

});

const ContentScript: FC = () => {
    const { offset, originalLine, onPopupClose, onPopupKeep } = useSetupContent();
    const showPopup = offset.top && offset.left;

    return (
        <ReactShadowRoot mode="open">
            {showPopup && (
                <TranslationPopup
                    offsetLeft={offset.left}
                    offsetTop={offset.top}
                    originalLine={originalLine}
                    onClose={onPopupClose}
                    onKeep={onPopupKeep}
                />
            )}
        </ReactShadowRoot>
    )
};

export default ContentScript;


