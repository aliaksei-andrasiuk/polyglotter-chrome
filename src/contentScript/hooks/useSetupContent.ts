import { useEffect, useState } from "react";
import { MessageType } from "../types";
import { fillParagraphs } from "../utils";

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
        fillParagraphs();

        window.addEventListener("message", onReceiveOffset, false);


        return () => {
            window.removeEventListener("message", onReceiveOffset, false);
        }
    }, []);

    return { offset }
}

