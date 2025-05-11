import { useEffect, useState } from "react";
import { MessageType } from "../types";
import { getArticleText, processPageTranslation, replaceTranslatedContent } from "../utils";
// import { fillParagraphs } from "../utils";

interface OffsetState {
    top: number | null;
    left: number | null;
}

const offsetDefaultState = { top: null, left: null };

export const useSetupContent = () => {
    const [offset, setOffset] = useState<OffsetState>(offsetDefaultState);

    const onReceiveOffset = (event: MessageEvent) => {
        if (event.source === window){
            if (event.data.type === MessageType.TRANSLATED_ELEMENT_MOUSE_ENTER) {
                console.log("Received:", event.data.payload);
    
                setOffset(event.data.payload);
            }

            if (event.data.type === MessageType.TRANSLATED_ELEMENT_MOUSE_LEAVE) {
                console.log("Received:", event.data.payload);
    
                setOffset(offsetDefaultState);
            }
        }
    };

    useEffect(() => {
        const articleText = getArticleText();

        const fetchTranslation = async () => {
            try {
                const translatedResponse = await fetch("http://localhost:8081/translate", { 
                    method: "POST",
                    body: JSON.stringify({ text: articleText }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(res => res.json());

                replaceTranslatedContent(translatedResponse.data)
    
                console.log("Translated text:", translatedResponse.data); 
            } catch (error) {
                console.error("Failed to fetch translation:", error);
            }
        }

        fetchTranslation();
        // fillParagraphs();
        // processPageTranslation();

        window.addEventListener("message", onReceiveOffset, false);


        return () => {
            window.removeEventListener("message", onReceiveOffset, false);
        }
    }, []);

    return { offset }
}

