import { baseUrlApi } from '../App';


export function testFet() {
    return useFetch();

}

export async function useFetch(): Promise<[boolean]> {

    const test = 'D:\\Downloads\\classify_workspace\\Backgrounds';

    const response = await fetch(
        `${baseUrlApi}check-path?sourcePath=${test}`,
        { method: "GET" }
    );

    return [response.status === 200];
}
