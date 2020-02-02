export class RuleCardModel {

    fileTypes: string[];

    actionType: 'move' | 'deleted';

    targetPath?: string;

    isActive: boolean;

    isWorking: boolean

    get hasValue(): boolean {
        if (this.fileTypes.length === 0) {
            return false
        }

        if (this.actionType === 'move' && !this.targetPath) {
            return false
        }

        return true;
    }

    get canApply(): boolean {
        if (!this.isActive) {
            return false
        }

        return this.hasValue;
    }

    constructor() {
        this.actionType = 'move';
        this.isActive = true;
        this.isWorking = false;
        this.fileTypes = [];
    }

}
