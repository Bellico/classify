import { useState, useEffect } from 'react';


export const baseUrlApi = 'http://localhost:3001/api/'


async function checkPath(path: string): Promise<boolean> {

    const response = await fetch(
        `${baseUrlApi}check-path?sourcePath=${path}`,
        { method: "GET" }
    );

    return response.status === 200;
}


export function useAsyncHook(path: string): [boolean, boolean] {
    const [result, setResult] = useState(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {

        async function fetchBookList() {

            setLoading(true);
            const valid = await checkPath(path);

            setResult(valid);
            setLoading(false);

        }

        fetchBookList();


    }, [path]);

    return [result, loading];
}
