import React from 'react';
import { TextField, FormControl, Select, MenuItem, Typography, Avatar, Checkbox, RadioGroup, FormControlLabel, Radio, LinearProgress } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export const CardRule = () => {
    return (
        <article>
            <div className="card">

                <div className="card-container">
                    <Checkbox color="default" edge="start" />
                </div>

                <div className="card-container">

                    <div className="card-content">
                        <Typography color="textSecondary" className="label-select">Type(s) de fichier :</Typography>

                        <FormControl variant="standard">
                            <Select
                                multiple
                                value={[10, 20, 30]}>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                <MenuItem value={50}>Thirty</MenuItem>
                                <MenuItem value={40}>Thirty</MenuItem>
                                <MenuItem value={60}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className="card-content">
                        <RadioGroup name="gender1" style={{ flexDirection: 'row' }} >
                            <FormControlLabel
                                value="move"
                                control={<Radio color="primary" />}
                                label="Déplacer vers" />

                            <FormControlLabel
                                value="deleted"
                                control={<Radio color="primary" />}
                                label="Supprimer" />
                        </RadioGroup>
                    </div>

                    <div className="card-content">
                        <Avatar className="icon-folder">
                            <FolderIcon />
                        </Avatar>
                        <TextField
                            fullWidth
                            label="Dossier cible"
                            variant="outlined" />
                    </div>

                    <div className="card-content">
                        <Button className="button" variant="outlined" size="medium">Appliquer la regle</Button>
                    </div>

                </div>

                <div className="card-container">
                    <IconButton edge="end">
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>
            <LinearProgress />
        </article >
    )
};

