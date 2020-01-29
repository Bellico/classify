import React, { useState, FunctionComponent } from 'react';
import classify from '../classify.svg';
import TextField from '@material-ui/core/TextField';
import { useAsyncHook } from '../hooks/fetch';
import { InputAdornment, Button, Fade, Zoom } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import { debounce } from 'lodash-es';
import Send from '@material-ui/icons/Send';

const pathSaved = localStorage.getItem('pathFolderToClassify') || '';

export const HomePage: FunctionComponent<{ startWorkingOn: (path: string) => void }> = ({ startWorkingOn }) => {

    const [startPath, setStartPath] = useState(pathSaved);
    const [checked] = useAsyncHook(startPath);

    const CheckedIcon = () => {
        if (startPath === '') return null;

        return checked ? <Done color="primary" /> : <Close color="secondary" />
    }

    const handleChangeDebounced = debounce((value: string) => {
        setStartPath(value);
    }, 200);

    const onClickStart = () => {
        localStorage.setItem('pathFolderToClassify', startPath);
        startWorkingOn(startPath);
    }

    return (
        <section className="home">
            <Zoom in>
                <div className="container">
                    <img src={classify} className="app-logo" alt="classify" />

                    <TextField
                        className="input-start"
                        defaultValue={startPath}
                        onChange={(e) => handleChangeDebounced(e.target.value)}
                        label="Dossier à classer"
                        placeholder="Chemin complet du dossier source"
                        fullWidth
                        color={checked ? 'primary' : 'secondary'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <CheckedIcon />
                            </InputAdornment>,
                        }}>
                    </TextField>

                    {checked &&
                        <div className="start-button">
                            <Fade in>
                                <Button
                                    onClick={onClickStart}
                                    variant="contained"
                                    color="primary"
                                    endIcon={<Send />}>
                                    Commencer
                                </Button>
                            </Fade>
                        </div>}
                </div>
            </Zoom>

        </section>
    )
};
