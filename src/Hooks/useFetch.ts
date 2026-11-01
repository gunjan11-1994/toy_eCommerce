import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [retry, setRetry] = useState(0);


    useEffect(() => {
        const fetchData = async () => {

            try {
                setLoading(true);
                setError(null);

                const response = await fetch(url);

                if (!response.ok) { throw new Error("Failed to load toys"); }

                const result: T[] = await response.json();

                setData(result);
            } catch {
                setError("Failed to load toys");
            }
            finally {
                setLoading(false);
            }

        };


        setTimeout(() => {
            fetchData();
        }, 1000);
    }, [url, retry]);

    const refetch = () => {
        setRetry((previous) => previous + 1);
    };

    return { data, loading, error, refetch };
}

export default useFetch;