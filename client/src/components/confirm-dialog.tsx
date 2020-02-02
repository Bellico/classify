import React, { FunctionComponent } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export type DialogConfirmProps<T = { confirm: boolean }> = {
    textConfirm: string,
    textCancel: string,
    textTitle: string,
    textContent: string,
    onConfirm: (data: T) => void;
}

export const ConfirmDialog: FunctionComponent<DialogConfirmProps> = (props) => (
    <Dialog
        open
        onClose={() => props.onConfirm({ confirm: false })}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
            {props.textTitle}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {props.textContent}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={() => props.onConfirm({ confirm: false })}>
                {props.textCancel}
            </Button>
            <Button color="primary" autoFocus onClick={() => props.onConfirm({ confirm: true })}>
                {props.textConfirm}
            </Button>
        </DialogActions>
    </Dialog>
)

