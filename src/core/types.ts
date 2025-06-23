export enum MessageType {
    SHOW_TRANSLATION_POPUP = 'SHOW_TRANSLATION_POPUP',
    HIDE_TRANSLATION_POPUP = 'HIDE_TRANSLATION_POPUP',
    PAUSE_EXTENSION = 'PAUSE_EXTENSION',
    RESUME_EXTENSION = 'RESUME_EXTENSION'
}

export interface ITranslatedItems {
    originalLine: string;
    translatedLine: string;
}

export interface IMessage<T> {
    type: MessageType;
    payload?: T;
}

export interface IOffsetPayload {
    left: number;
    top: number;
    width: number;
    height: number;
    originalLine: string;
}
