import React from 'react';
import classify from '../classify.svg';
import { Typography } from '@material-ui/core';

export const HeaderWorking = () => {
    return (
        <header className="card header">
            <img src={classify} className="app-logo" alt="classify" />
            <div className="path-info">
                <Typography variant="subtitle1" >
                    E:\PartageLab\partage-react-client
                </Typography>

                <Typography variant="subtitle2" color="primary" >
                    <strong>(336 fichiers)</strong>
                </Typography>
            </div>
        </header>
    )
};

