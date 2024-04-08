import { useCallback } from 'react';

function usePut<T>() {
    const putData = useCallback(async (url: string, data: T): Promise<boolean> => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.ok;
    }, []);

    return putData;
}

export default usePut;
