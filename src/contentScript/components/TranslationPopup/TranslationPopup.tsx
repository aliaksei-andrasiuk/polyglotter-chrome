import React, { FC } from 'react';

import './TranslationPopup.scss';
interface TranslationPopupProps {
    originalLine: string;
    offsetLeft: number;
    offsetTop: number;
    onClose: () => void;
    onKeep: () => void;
}

export const TranslationPopup: FC<TranslationPopupProps> = ({
    offsetTop,
    offsetLeft,
    originalLine,
    onClose,
    onKeep
}) => {
    const translateX = offsetLeft ? `${offsetLeft}px` : '-1000px';
    const translateY = offsetTop ? `${offsetTop}px` : '-1000px';

    return (
        <div
            className="translation-popup-wrapper"
            style={{
                transform: `translateX(${translateX}) translateY(${translateY}) translateZ(0px)`,
                transition: 'transform 0.7s ease-in-out',
                position: 'absolute',
                zIndex: 9999999999,
                top: 0,
                left: 0,
                width: '100px',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '30px',
                padding: '10px',
                borderRadius: '5px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                fontSize: '16px'
            }}
            onMouseLeave={onClose}
            onMouseEnter={onKeep}
        >
            <span>{originalLine}</span>
        </div>
    );
};
