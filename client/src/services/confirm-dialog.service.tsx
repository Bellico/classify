import React from 'react';
import { DialogService } from './dialog.service';
import { ConfirmDialog } from '../components/confirm-dialog';

export type DialogServiceData = {
    textConfirm: string,
    textCancel: string,
    textTitle: string,
    textContent: string
}

export class ConfirmDialogService extends DialogService {

    constructor(data: DialogServiceData) {
        super();

        this.setDialog(<ConfirmDialog
            textConfirm={data.textConfirm}
            textCancel={data.textCancel}
            textTitle={data.textTitle}
            textContent={data.textContent}
            onConfirm={(value) => this.confirm(value)}>
        </ConfirmDialog>);
    }
}
