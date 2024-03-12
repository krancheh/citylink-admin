import React, { useEffect, useState } from 'react'
import $api from '../api';
import axios, { AxiosRequestConfig } from 'axios';


interface ApiResponse<T> {
    data: T;
}


const useFetch = <DataType,>(url: string, config?: AxiosRequestConfig) => {
    const [data, setData] = useState<DataType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                const response: ApiResponse<DataType> = await $api.get(url, { ...config, cancelToken: source.token });
                setData(response.data);
                setError(null);

            } catch (e: any) {
                if (axios.isCancel(e)) {
                    console.log("Запрос отменен", e.message);
                }
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        return () => {
            source.cancel("Unmounted");
        }

    }, [url]);


    return { data, loading, error };
}

export default useFetch;