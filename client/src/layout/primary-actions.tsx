import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';
import Add from '@material-ui/icons/Add';

export const PrimaryActions: FunctionComponent<{ handleAddRule: () => void, handleApplyRules: () => void, countRule: number }> =
    ({ handleAddRule, handleApplyRules, countRule }) => {
        return (
            <div className="primary-actions">
                <Button
                    onClick={handleAddRule}
                    className="button"
                    variant="contained"
                    color="default"
                    startIcon={<Add />}>
                    Ajouter une regle
                </Button>

                {countRule > 1 &&
                    <Button
                        onClick={handleApplyRules}
                        className="button"
                        variant="contained"
                        color="primary">
                        Appliquer les {countRule} regles
                    </Button>
                }
            </div>
        )
    };

