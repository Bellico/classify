import React, { FunctionComponent } from 'react';
import classify from '../classify.svg';
import { Typography, Button } from '@material-ui/core';

export const HeaderWorking: FunctionComponent<{ startPath: string, countFiles: number, onBackHome: () => void }> = ({ startPath, countFiles, onBackHome }) => {
    return (
        <header className="card header">
            <img src={classify} className="app-logo" alt="classify" />

            <div className="path-info">
                <Typography variant="subtitle1" >
                    {startPath}
                </Typography>

                <Typography variant="subtitle2" color="primary" >
                    <strong>({countFiles} fichier{countFiles > 1 ? 's' : ''})</strong>
                </Typography>
            </div>

            <Button color="primary" onClick={onBackHome}>Retour au choix du dossier</Button>
        </header>
    )
};

