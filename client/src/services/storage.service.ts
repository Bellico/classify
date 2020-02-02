import { RuleCardModel } from '../models/rule-card.model';

export const StorageService = {
    getClassifyPath: function () {
        return localStorage.getItem('pathFolderToClassify') || '';
    },

    saveClassifyPath: function (path: string) {
        localStorage.setItem('pathFolderToClassify', path);
    },

    getCards: function () {
        const cards = localStorage.getItem('cards');

        return cards ?
            JSON.parse(cards).map((c: any) => Object.assign(new RuleCardModel(), c))
            : [];
    },

    saveCards: function (cards: RuleCardModel[]) {
        localStorage.setItem('cards', JSON.stringify(cards));
    }
}
