import { useCallback } from 'react';

function usePost<T>() {
    const postData = useCallback(async (url: string, data: T): Promise<boolean> => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    }, []);

    return postData;
}

export default usePost;