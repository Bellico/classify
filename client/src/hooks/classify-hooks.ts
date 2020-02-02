import { useRequest } from './request-helpers';
import { useState, useEffect } from 'react';
import { RuleCardModel } from '../models/rule-card.model';
import { StorageService } from '../services/storage.service';

export function useCheckPath(path: string) {
    const [requestResult, requestLoading, setRequest] = useRequest();

    useEffect(() => {
        if (path) {
            setRequest({
                uri: `checked-path?sourcePath=${path}`
            })
        }
    }, [path, setRequest]);

    return [requestResult && requestResult.checked, requestLoading];
}

export function useFetchExtensions(path: string) {
    const [requestResult, requestLoading, setRequest] = useRequest();

    useEffect(() => {
        if (path) {
            setRequest({
                uri: `extensions?sourcePath=${path}`
            })
        }
    }, [path, setRequest]);

    return [requestResult, requestLoading];
}

export function useFetchApplyRule(sourcePath: string) {
    const [ruleToApply, setRuleToApply] = useState();
    const [requestResult, requestLoading, setRequest] = useRequest();

    useEffect(() => {
        if (ruleToApply) {
            setRequest({
                uri: 'rule',
                options: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: ruleToApply.actionType,
                        targetPath: ruleToApply.targetPath,
                        fileTypes: ruleToApply.fileTypes,
                        sourcePath
                    })
                }
            })
        }
    }, [ruleToApply, sourcePath, setRequest]);

    return [requestResult, requestLoading, ruleToApply, setRuleToApply];
}

export function useRulesQueue(startPath: string): [RuleCardModel[], (cards: RuleCardModel[]) => void, (queue: RuleCardModel[]) => void] {

    const [cards, setCards] = useState<RuleCardModel[]>(StorageService.getCards());
    const [applyResult, applyLoading, ruleToApply, setRuleToApply] = useFetchApplyRule(startPath);
    const [queue, setQueue] = useState<RuleCardModel[]>([]);

    useEffect(() => {
        if (applyResult && applyResult.success) {
            queue.splice(0, 1);
            setQueue([...queue]);
        }
    }, [applyResult])

    useEffect(() => {
        if (ruleToApply) {
            ruleToApply.isWorking = applyLoading
            ruleToApply.isActive = applyLoading
            setCards([...cards])
        }
    }, [ruleToApply, applyLoading])

    useEffect(() => {
        if (queue.length > 0) {
            setRuleToApply(queue[0]);
        } else if (ruleToApply) {
            setRuleToApply(null);
        }
    }, [queue])

    return [cards, setCards, setQueue];
}
