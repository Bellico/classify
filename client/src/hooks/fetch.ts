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

    async function fetchBookList() {
        console.log('paaaht', path);

        setLoading(true);
        const valid = await checkPath(path);
        console.log('valid', valid);

        setResult(valid);
        setLoading(false);

    }


    useEffect(() => {


        fetchBookList();


    }, [path]);

    return [result, loading];
}
