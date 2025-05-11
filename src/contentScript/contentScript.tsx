import React, { FC } from "react";
import ReactShadowRoot from "react-shadow-root";
import { TranslationPopup } from "./components";
import { useSetupContent } from "./hooks/useSetupContent";

chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

});

const ContentScript: FC = () => {
    const { offset } = useSetupContent();
    const showPopup = offset.top && offset.left;

    return (
        <ReactShadowRoot mode="open">
            <h1>Hello World</h1>
            {showPopup && <TranslationPopup offsetLeft={offset.left} offsetTop={offset.top} />}
        </ReactShadowRoot>
    )
};

export default ContentScript;


