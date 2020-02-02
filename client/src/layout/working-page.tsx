import React, { FunctionComponent, useState } from 'react';
import { HeaderWorking } from './header-working';
import { PrimaryActions } from './primary-actions';
import { RuleCard } from '../components/rule-card';
import { useGetExtensions, usePostRule } from '../hooks/classify-hooks';
import { LinearProgress } from '@material-ui/core';
import { RuleCardModel } from '../models/rule-card.model';
import { ConfirmDialogService } from '../services/confirm-dialog.service';
import { getCardsInStorage, saveCardsInStorage } from '../services/storage.service';


export const WorkingPage: FunctionComponent<{ startPath: string, setStartPath: (path: string) => void }> = ({ startPath, setStartPath }) => {

    const [cards, setCards] = useState<RuleCardModel[]>(getCardsInStorage());
    const [result, loading] = useGetExtensions(startPath);
    const [setCardWorking] = usePostRule(startPath);

    const addCard = () => {
        setCards([
            ...cards,
            new RuleCardModel()
        ]);
    }

    const backHome = () => {
        setStartPath('');
    }

    const countActiveCards = () => cards.filter(c => c.canApply).length;

    const saveChangesCard = () => {
        setCards([...cards]);
        saveCardsInStorage(cards);
    }

    const deleteCard = async (card: RuleCardModel) => {
        function _delete() {
            const index = cards.indexOf(card);
            cards.splice(index, 1);
            setCards([...cards]);
            saveCardsInStorage(cards);
        }

        if (!card.hasValue) {
            _delete();
            return;
        }

        const result = await new ConfirmDialogService({
            textTitle: 'Suppression de la regle',
            textContent: 'Voulez vous vraiment supprimer cette règle?',
            textCancel: 'Annuler',
            textConfirm: 'Supprimer'
        }).show();

        if (result.confirm) {
            _delete();
        }
    }

    const applyRuleCard = async (card: RuleCardModel) => {
        const result = await new ConfirmDialogService({
            textTitle: `Application de la regle de ${card.actionType === 'move' ? 'déplacement' : 'suppression'}`,
            textContent: `Voulez vous vraiment appliquer la règle de ${card.actionType === 'move' ? 'déplacement' : 'suppression'}?`,
            textCancel: 'Annuler',
            textConfirm: 'Appliquer'
        }).show();

        if (result.confirm) {
            card.isWorking = true;
            setCards([...cards]);
            setCardWorking(card);
        }
    }

    const applyAllRulesCards = async () => {
        const result = await new ConfirmDialogService({
            textTitle: 'Application de toute les règles',
            textContent: `Voulez vous vraiment appliquer successivement les ${countActiveCards()} règles ?`,
            textCancel: 'Annuler',
            textConfirm: `Appliquer (${countActiveCards()})`
        }).show();
    }

    return (
        <section className="working">
            <div className="container">
                {loading && <LinearProgress />}

                {result && (
                    <>
                        <HeaderWorking startPath={startPath} countFiles={result.countFiles} onBackHome={backHome} />

                        {cards.map((card, index) =>
                            <RuleCard
                                key={index}
                                card={card}
                                fileTypeList={result.extensions}
                                onSaveChanges={saveChangesCard}
                                onDelete={deleteCard}
                                applyRule={applyRuleCard} />
                        )}

                        <PrimaryActions handleAddRule={addCard} handleApplyRules={applyAllRulesCards} countRule={countActiveCards()} />
                    </>
                )}
            </div>
        </section >
    )
};

