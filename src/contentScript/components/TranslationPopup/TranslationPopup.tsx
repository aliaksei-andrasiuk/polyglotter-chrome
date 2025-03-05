import React, { FC } from "react";

interface TranslationPopupProps {
    offsetLeft: number;
    offsetTop: number;
    // offsetWidth: number;
    // offsetHeight: number;
}

export const TranslationPopup: FC<TranslationPopupProps> = ({ offsetTop, offsetLeft }) => {
    const translateX = offsetLeft ? `${offsetLeft}px` : '-1000px';
    const translateY = offsetTop ? `${offsetTop}px` : '-1000px';

    return (
        <div
            className="translation-popup-wrapper"
            style={{
                transform: `translateX(${translateX}) translateY(${translateY}) translateZ(0px)`,
                transition: 'transform 0.3s ease-in-out',
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
                fontSize: '16px',
            }}
        >
            <span>Translated word</span>
        </div>
    )
};
