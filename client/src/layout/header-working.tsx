import React from 'react';
import classify from '../classify.svg';

export const HeaderWorking = () => {
    return (
        <header className="header-working">
            <img src={classify} className="app-logo" alt="classify" />
            <p className="path-info">
                E:\PartageLab\partage-react-client <br />
                <strong>(336 fichiers)</strong>
            </p>
        </header>
    )
};

