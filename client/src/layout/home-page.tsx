import React, { useState, FunctionComponent } from 'react';
import classify from '../classify.svg';
import TextField from '@material-ui/core/TextField';
import { InputAdornment, Button, Fade, Zoom } from '@material-ui/core';
import Done from '@material-ui/icons/Done';
import Close from '@material-ui/icons/Close';
import { debounce } from 'lodash-es';
import Send from '@material-ui/icons/Send';
import { useCheckPath } from '../hooks/classify-hooks';
import { StorageService } from '../services/storage.service';


export const HomePage: FunctionComponent<{ startWorkingOn: (path: string) => void }> = ({ startWorkingOn }) => {

    const [startPath, setStartPath] = useState(StorageService.getClassifyPath());
    const [startPathChecked] = useCheckPath(startPath);

    const CheckedIcon = () => {
        if (startPath === '') return null;

        return startPathChecked ? <Done color="primary" /> : <Close color="secondary" />
    }

    const handleChangeDebounced = debounce((value: string) => {
        setStartPath(value);
    }, 200);

    const handleKeyDown = (event: any) => {
        if (startPathChecked && event.keyCode === 13) {
            start();
        }
    }

    const start = () => {
        startWorkingOn(startPath);
        StorageService.saveClassifyPath(startPath);
    }

    return (
        <section className="home">
            <Zoom in>
                <div className="container">
                    <img src={classify} className="app-logo" alt="classify" />

                    <TextField
                        className="input-start"
                        defaultValue={startPath}
                        onChange={e => handleChangeDebounced(e.target.value)}
                        onKeyUp={handleKeyDown}
                        label="Dossier à classer"
                        placeholder="Chemin complet du dossier source"
                        fullWidth
                        color={startPathChecked ? 'primary' : 'secondary'}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">
                                <CheckedIcon />
                            </InputAdornment>,
                        }}>
                    </TextField>

                    {startPath && startPathChecked &&
                        <div className="start-button">
                            <Fade in>
                                <Button
                                    onClick={start}
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
