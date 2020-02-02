import React, { FunctionComponent } from 'react';
import { TextField, FormControl, Select, MenuItem, Typography, Avatar, Checkbox, RadioGroup, FormControlLabel, Radio, LinearProgress, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import { RuleCardModel } from '../models/rule-card.model';
import { useCheckPath } from '../hooks/classify-hooks';
import { debounce } from 'lodash-es';

type RuleCardProp = {
    fileTypeList: string[],
    card: RuleCardModel,
    onSaveChanges: () => void,
    onDelete: (card: RuleCardModel) => void
    applyRule: (card: RuleCardModel) => void
}

export const RuleCard: FunctionComponent<RuleCardProp> = ({ fileTypeList, card, onSaveChanges, onDelete, applyRule }) => {

    const [targetPathChecked] = useCheckPath('' + card.targetPath);

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        card[name as 'actionType' | 'targetPath'] = value;
        onSaveChanges();
    }

    const handleChangeDebounced = debounce((target: any) => {
        handleChange({ target });
    }, 300);

    const handleChangeCheckbox = (event: any) => {
        const { name, checked } = event.target;
        card[name as 'isActive'] = checked;
        onSaveChanges();
    }

    const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
        card.fileTypes = event.target.value as string[]
        onSaveChanges();
    };

    return (
        <article>
            <div className={`card ${!card.isActive ? 'disabled' : ''}`}>

                <div className="card-container">
                    <Checkbox
                        color="default"
                        edge="start"
                        name="isActive"
                        onChange={handleChangeCheckbox}
                        checked={card.isActive} />
                </div>

                <div className="card-container">

                    <div className="card-content">
                        <Typography color="textSecondary" className="label-select">Type(s) de fichier : </Typography>

                        <FormControl variant="standard">
                            <Select
                                disabled={!card.isActive}
                                multiple
                                name="fileTypes"
                                renderValue={selected => (selected as string[]).join(', ')}
                                onChange={handleChangeSelect}
                                value={card.fileTypes}>
                                {fileTypeList.map((fileTypeName) => {
                                    return (
                                        <MenuItem key={fileTypeName} value={fileTypeName}>
                                            <Checkbox checked={card.fileTypes.indexOf(fileTypeName) > -1} />
                                            <ListItemText primary={fileTypeName} />
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </div>

                    <div className="card-content">
                        <RadioGroup
                            onChange={handleChange}
                            value={card.actionType}
                            name="actionType"
                            style={{ flexDirection: 'row' }} >
                            <FormControlLabel
                                disabled={!card.isActive}
                                value="move"
                                control={<Radio color="primary" />}
                                label="Déplacer vers" />

                            <FormControlLabel
                                disabled={!card.isActive}
                                value="deleted"
                                control={<Radio color="primary" />}
                                label="Supprimer" />
                        </RadioGroup>
                    </div>

                    {card.actionType === 'move' &&
                        <div className="card-content">
                            <Avatar className="icon-folder">
                                <FolderIcon />
                            </Avatar>
                            <TextField
                                name="targetPath"
                                disabled={!card.isActive}
                                onChange={e => handleChangeDebounced(e.target)}
                                defaultValue={card.targetPath}
                                fullWidth
                                label="Dossier cible"
                                variant="outlined"
                                InputProps={{
                                    endAdornment: card.targetPath && !targetPathChecked && <CreateNewFolder color="primary" />,
                                }} />
                        </div>
                    }

                    <div className="card-content">
                        <Button
                            disabled={!card.canApply}
                            className="button"
                            variant="outlined"
                            size="medium"
                            onClick={() => applyRule(card)}>
                            Appliquer la regle
                        </Button>
                    </div>

                </div>

                <div className="card-container">
                    <IconButton
                        edge="end"
                        onClick={() => onDelete(card)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            {card.isWorking && <LinearProgress className="progress-bar" />}
        </article >
    )
};

