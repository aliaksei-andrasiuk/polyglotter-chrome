import { useEffect, useRef, useState } from 'react';
import {
    getArticleText,
    replaceTranslatedContent,
    MessageType,
    removeInjectedTranslations,
    IMessage,
    IOffsetPayload
} from '../../core';
import { OffsetState } from './useSetupContent.types';

const offsetDefaultState = { top: null, left: null };

export const useSetupContent = () => {
    const [offset, setOffset] = useState<OffsetState>(offsetDefaultState);
    const [originalLine, setOriginalLine] = useState<string>('');
    const popupOnCloseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        chrome.storage.local.get(['extensionStatus'], (result) => {
            const status = result.extensionStatus;

            status.isEnabled && handleSetupContent();
        });

        window.addEventListener('message', onReceiveOffset, false);
        chrome.runtime.onMessage.addListener(handleChromeMessage);

        return () => {
            window.removeEventListener('message', onReceiveOffset, false);
            chrome.runtime.onMessage.removeListener(handleChromeMessage);
        };
    }, []);

    const handleChromeMessage = (message: IMessage<IOffsetPayload>) => {
        if (message.type === MessageType.PAUSE_EXTENSION) {
            removeInjectedTranslations();
        }

        if (message.type === MessageType.RESUME_EXTENSION) {
            handleSetupContent();
        }
    };

    const handleSetupContent = () => {
        const articleText = getArticleText();

        if (!articleText) {
            console.log('No article text found.');
            return;
        }

        const fetchTranslation = async () => {
            try {
                const translatedResponse = await fetch(`${process.env.API_URL}/translate`, {
                    method: 'POST',
                    body: JSON.stringify({ text: articleText }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((res) => res.json());

                replaceTranslatedContent(translatedResponse.data);

                console.log('Translated text:', translatedResponse.data);
            } catch (error) {
                console.error('Failed to fetch translation:', error);
            }
        };

        fetchTranslation();
    };

    const onReceiveOffset = (event: MessageEvent) => {
        if (event.source === window) {
            if (event.data.type === MessageType.SHOW_TRANSLATION_POPUP) {
                onPopupKeep();

                setOffset(event.data.payload);
                setOriginalLine(event.data.payload.originalLine);
            }

            if (event.data.type === MessageType.HIDE_TRANSLATION_POPUP) {
                onPopupClose();
            }
        }
    };

    const onPopupClose = () => {
        popupOnCloseTimeout.current = setTimeout(() => {
            setOffset(offsetDefaultState);
            setOriginalLine('');
        }, 500);
    };

    const onPopupKeep = () => {
        popupOnCloseTimeout && clearTimeout(popupOnCloseTimeout.current);
    };

    return { offset, originalLine, onPopupClose, onPopupKeep };
};
