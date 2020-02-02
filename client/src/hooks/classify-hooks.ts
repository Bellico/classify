import { useRequest, getDataRequest } from './request-helpers';
import { useState, useEffect } from 'react';

export function useCheckPath(path: string) {
    const uri = `checked-path?sourcePath=${path}`;
    const [result, loading] = useRequest(uri);

    return [result && result.checked, loading];
}

export function useGetExtensions(path: string) {
    const uri = `extensions?sourcePath=${path}`;

    return useRequest(uri);
}

const baseUrlApi = 'http://localhost:3001/api/'

export function usePostRule(sourcePath: string) {
    const uri = `rule`;

    const [cardWorking, setCardWorking] = useState();

    useEffect(() => {
        if (cardWorking) {

            const request = {
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
            };

            async function fetchRequest() {
                const result = await getDataRequest(`${baseUrlApi}${uri}`, request as RequestInit);
                console.log(result);
            }

            fetchRequest();

            setCardWorking(null);
        }
    }, [cardWorking, sourcePath, uri]);


    //   const result = useRequest(uri, { method: 'POST', body });

    return [setCardWorking];
}


// const usePostRule = () => {
//     const [data, setData] = useState({ hits: [] });
//     const [url, setUrl] = useState(
//         'https://hn.algolia.com/api/v1/search?query=redux',
//     );
//     const [isLoading, setIsLoading] = useState(false);
//     const [isError, setIsError] = useState(false);
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsError(false);
//             setIsLoading(true);
//             try {
//                 const result = await axios(url);
//                 setData(result.data);
//             } catch (error) {
//                 setIsError(true);
//             }
//             setIsLoading(false);
//         };
//         fetchData();
//     }, [url]);
//     return [{ data, isLoading, isError }, setUrl];
// }
