import React, { useState } from 'react';
import classify from './../classify.svg';
import TextField from '@material-ui/core/TextField';
import { useFetch, testFet } from '../hooks/fetch';
import { IconButton, InputAdornment } from '@material-ui/core';
import Done from '@material-ui/icons/Done';

export const HomePage = () => {

    const [isLoading, setIsLoading] = useState(true);




    return (
        <section className="home">
            <div className="container">
                <img src={classify} className="app-logo" alt="classify" />

                <TextField
                    label="Dossier à classer"
                    placeholder="Chemin complet du dossier source"
                    fullWidth
                    color="secondary"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton>
                                <Done color="secondary" />
                            </IconButton>
                        </InputAdornment>,
                    }}>
                </TextField>
            </div>
        </section>
    )
};
