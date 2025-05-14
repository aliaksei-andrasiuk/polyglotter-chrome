import { useEffect, useRef, useState } from "react";
import { MessageType } from "../types";
import { getArticleText, replaceTranslatedContent } from "../utils";
import { config } from '../../config';

interface OffsetState {
    top: number | null;
    left: number | null;
}

const offsetDefaultState = { top: null, left: null };

export const useSetupContent = () => {
    const [offset, setOffset] = useState<OffsetState>(offsetDefaultState);
    const [originalLine, setOriginalLine] = useState<string>("");
    let popupOnCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onReceiveOffset = (event: MessageEvent) => {
        if (event.source === window){
            if (event.data.type === MessageType.SHOW_TRANSLATION_POPUP) {
                console.log("Received:", event.data.payload);
    
                onPopupKeep();

                setOffset(event.data.payload);
                setOriginalLine(event.data.payload.originalLine);
            }

            if (event.data.type === MessageType.HIDE_TRANSLATION_POPUP) {
                console.log("Received:", event.data.payload);
    
                onPopupClose();
            }
        }
    };

    const onPopupClose = () => {
        popupOnCloseTimeout.current = setTimeout(() => {
            setOffset(offsetDefaultState);
            setOriginalLine("");
        }, 500);
    }

    const onPopupKeep = () => {
        popupOnCloseTimeout && clearTimeout(popupOnCloseTimeout.current);
    }

    useEffect(() => {
        const articleText = getArticleText();

        const fetchTranslation = async () => {
            try {
                const translatedResponse = await fetch(`${config.API_URL}/translate`, { 
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
        // processPageTranslation();

        window.addEventListener("message", onReceiveOffset, false);


        return () => {
            window.removeEventListener("message", onReceiveOffset, false);
        }
    }, []);

    return { offset, originalLine, onPopupClose, onPopupKeep }
}

