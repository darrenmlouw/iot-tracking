// useFetch.ts - A custom hook for fetching data
import { useEffect, useState } from 'react';

const useFetch = <T>(url: string): [T | undefined, () => Promise<void>] => {
    const [data, setData] = useState<T>();

    const fetchData = async () => {
        const response = await fetch(url, {
            headers: { Accept: 'application/json' },
        });
        const result = await response.json();
        setData(result);
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return [data, fetchData];
};

export default useFetch;
