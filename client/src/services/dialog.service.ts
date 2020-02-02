import ReactDOM from 'react-dom';
import { ReactNode } from 'react';

export abstract class DialogService<T = { confirm: boolean }>{

    private container: HTMLDivElement;

    private resolve: ((value: T) => void) | undefined;

    private node: ReactNode;

    constructor() {
        this.container = document.createElement('div');
        this.container = document.createElement('div');
        this.container.classList.add('dialog-app');
    }

    protected setDialog(node: ReactNode) {
        this.node = node;
    }

    protected confirm(value: T) {
        this.close();

        if (this.resolve) {
            this.resolve(value);
        }
    }

    private close() {
        ReactDOM.unmountComponentAtNode(this.container)
        document.body.removeChild(this.container);
    }

    private render(node: any) {
        document.body.appendChild(this.container);
        ReactDOM.render(node, this.container);
    }

    show() {
        return new Promise<T>((resolve) => {
            this.resolve = resolve;
            this.render(this.node);
        });
    }
}

