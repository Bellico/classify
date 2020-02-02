import { RuleCardModel } from '../models/rule-card.model';

export function getClassifyPathInStorage() {
    return localStorage.getItem('pathFolderToClassify') || '';
}

export function saveClassifyPathInStorage(path: string) {
    localStorage.setItem('pathFolderToClassify', path);
}

export function getCardsInStorage() {
    const cards = localStorage.getItem('cards');

    return cards ?
        JSON.parse(cards).map((c: any) => Object.assign(new RuleCardModel(), c))
        : [];
}

export function saveCardsInStorage(cards: RuleCardModel[]) {
    localStorage.setItem('cards', JSON.stringify(cards));
}
