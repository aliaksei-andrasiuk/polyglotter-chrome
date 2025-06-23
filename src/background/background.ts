import { MessageType } from "../core";

const PAUSE_OPTIONS: Record<string, number | 'tomorrow' | 'indefinitely'> = {
    pause_1h: 1,
    pause_3h: 3,
    pause_tomorrow: 'tomorrow',
    pause_indefinitely: 'indefinitely',
};

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'pause_parent',
        title: 'Pause',
        contexts: ['action'],
    });

    chrome.contextMenus.create({
        id: 'pause_1h',
        parentId: 'pause_parent',
        title: '1 hour',
        contexts: ['action']
    });

    chrome.contextMenus.create({
        id: 'pause_3h',
        parentId: 'pause_parent',
        title: '3 hours',
        contexts: ['action'],
    });

    chrome.contextMenus.create({
        id: 'pause_tomorrow',
        parentId: 'pause_parent',
        title: 'Until tomorrow',
        contexts: ['action'],
    });

    chrome.contextMenus.create({
        id: 'pause_indefinitely',
        parentId: 'pause_parent',
        title: 'Indefinitely',
        contexts: ['action'],
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    const key = info.menuItemId;
    const value = PAUSE_OPTIONS[key];

    let until = -1;

    if (typeof value === 'number' && value > 0) {
        until = Date.now() + value * 60 * 60 * 1000;
    }

    if (value === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);
        until = tomorrow.getTime();
    }

    await chrome.storage.local.set({
        pauseState: { isPaused: true, until }
    });

    if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, {
            type: MessageType.PAUSE_EXTENSION,
            until
        });
    }
});
