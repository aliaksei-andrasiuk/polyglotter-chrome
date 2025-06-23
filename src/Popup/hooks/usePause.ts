import { ChangeEvent, useEffect, useState } from 'react';
import { MessageType } from '../../core';

export const usePauseExtension = () => {
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(['pauseState'], (result) => {
            const pauseState = result.pauseState;

            if (!pauseState || pauseState.isPaused !== true || (pauseState.until && pauseState.until < Date.now())) {
                setIsPaused(false);
            } else {
                setIsPaused(true);
            }
        });
    }, []);

    const handlePauseChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;

        setIsPaused(checked);

        if (checked) {
            const until = -1;
            await chrome.storage.local.set({
                pauseState: { isPaused: true, until }
            });

            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            tab?.id && chrome.tabs.sendMessage(tab.id, { type: MessageType.PAUSE_EXTENSION, until });
        } else {
            await chrome.storage.local.set({
                pauseState: { isPaused: false, until: 0 }
            });

            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            tab?.id && chrome.tabs.sendMessage(tab.id, { type: MessageType.RESUME_EXTENSION });
        }
    };

    return {
        isPaused,
        handlePauseChange
    };
};
