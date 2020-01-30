import React from 'react';
import { Button } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

export const PrimaryActions = () => {
    return (
        <div className="primary-actions">
            <Button
                className="button"
                variant="contained"
                color="default"
                startIcon={<Add />}>
                Ajouter une regle
            </Button>

            <Button className="button" variant="contained" color="primary">
                Appliquer les 2 regles
            </Button>
        </div>
    )
};

