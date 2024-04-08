import { useCallback } from 'react';

function useDelete() {
    const deleteData = useCallback(async (url: string): Promise<boolean> => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.ok;
    }, []);

    return deleteData;
}

export default useDelete;
