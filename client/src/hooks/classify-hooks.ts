import { useRequest } from './request-helpers';
import { useState, useEffect } from 'react';

export function useCheckPath(path: string) {

    const [result, loading, setRequest] = useRequest();

    useEffect(() => {
        if (path) {
            setRequest({
                uri: `checked-path?sourcePath=${path}`
            })
        }
    }, [path, setRequest]);

    return [result && result.checked, loading];
}

export function useGetExtensions(path: string) {
    const [result, loading, setRequest] = useRequest();

    useEffect(() => {
        if (path) {
            setRequest({
                uri: `extensions?sourcePath=${path}`
            })
        }
    }, [path, setRequest]);

    return [result, loading];
}

export function usePostRule(sourcePath: string) {

    const [cardWorking, setCardWorking] = useState();
    const [result, loading, setRequest] = useRequest();

    useEffect(() => {
        if (cardWorking) {
            setRequest({
                uri: 'rule',
                options: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: cardWorking.actionType,
                        targetPath: cardWorking.targetPath,
                        fileTypes: cardWorking.fileTypes,
                        sourcePath
                    })
                }
            })
        }
    }, [cardWorking, sourcePath, setRequest]);

    if (cardWorking) {
        cardWorking.isWorking = loading;
        if (result && result.success) {
            cardWorking.isActive = false;
        }
    }

    return [result, setCardWorking];
}
