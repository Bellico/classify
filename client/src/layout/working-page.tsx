import React from 'react';
import { HeaderWorking } from './header-working';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';

export const WorkingPage = () => {
    return (

        <section className="working">
            <div className="container">
                <HeaderWorking />

                <form noValidate autoComplete="off">

                    <Grid container spacing={3}>
                        <Grid item xs>

                            <FormControl variant="filled">
                                <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                                <Select
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs>
                            <FormControl>
                                <InputLabel>Age</InputLabel>
                                <Select>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Outlined secondary"
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>


                </form>


            </div>
        </section>
    )
};

