import { ChangeEvent, useEffect, useState } from 'react';
import { MessageType } from '../../core';

export const usePauseExtension = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        chrome.storage.local.get(['extensionStatus'], (result) => {
            const status = result.extensionStatus;

            if (!status || status.isEnabled) {
                setIsEnabled(true);
            } else {
                setIsEnabled(false);
            }
        });
    }, []);

    const handleExtensionStatusChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;

        setIsEnabled(checked);

        if (checked) {
            await chrome.storage.local.set({
                extensionStatus: { isEnabled: false, until: 0 }
            });

            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            tab?.id && chrome.tabs.sendMessage(tab.id, { type: MessageType.RESUME_EXTENSION });
        } else {
            const until = -1;
            await chrome.storage.local.set({
                extensionStatus: { isEnabled: true, until }
            });

            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            tab?.id && chrome.tabs.sendMessage(tab.id, { type: MessageType.PAUSE_EXTENSION, until });
        }
    };

    return {
        isEnabled,
        handleExtensionStatusChange
    };
};
