export enum MessageType {
    SHOW_TRANSLATION_POPUP = 'SHOW_TRANSLATION_POPUP',
    HIDE_TRANSLATION_POPUP = 'HIDE_TRANSLATION_POPUP'
}

export interface ITranslatedItems {
    originalLine: string;
    translatedLine: string;
}