import { useState, useEffect } from 'react';

const baseUrlApi = 'http://localhost:3001/api/'

export async function getDataRequest(path: string, request: RequestInit): Promise<any> {
    const response = await fetch(path, request);

    return await response.json();
}


export function useRequest(uri: string, request?: RequestInit): [any, boolean] {
    if (!request) {
        request = { method: 'GET' }
    }

    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        async function fetchRequest() {
            const result = await getDataRequest(`${baseUrlApi}${uri}`, request as RequestInit);
            setResult(result);
            setLoading(false);
        }

        fetchRequest();
    }, [uri]);

    return [result, loading];
}
