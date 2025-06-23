export enum MessageType {
    SHOW_TRANSLATION_POPUP = 'SHOW_TRANSLATION_POPUP',
    HIDE_TRANSLATION_POPUP = 'HIDE_TRANSLATION_POPUP',
    PAUSE_EXTENSION = 'PAUSE_EXTENSION',
    RESUME_EXTENSION = 'RESUME_EXTENSION',

}

export interface ITranslatedItems {
    originalLine: string;
    translatedLine: string;
}