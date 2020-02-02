import { useState, useEffect } from 'react';

const baseUrlApi = 'http://localhost:3001/api/'

async function getDataRequest(path: string, request: RequestInit): Promise<any> {
    const response = await fetch(baseUrlApi + path, request);

    return await response.json();
}

export function useRequest(): [any, boolean, (request: { uri: string, options?: RequestInit }) => void] {

    const [result, setResult] = useState();
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState<{ uri: string, options?: RequestInit }>();

    useEffect(() => {

        async function fetchRequest() {
            if (request) {
                if (!request.options) {
                    request.options = {
                        method: 'GET'
                    }
                }

                setLoading(true);
                const result = await getDataRequest(request?.uri, request?.options);
                setResult(result);
                setLoading(false);
            }
        }

        fetchRequest();

    }, [request]);

    return [result, loading, setRequest];
}
