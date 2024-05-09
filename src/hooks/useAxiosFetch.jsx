import axios from "axios";
import { useEffect, useState } from "react";

const useAxiosFetch = ( dataUrl ) => {
    // Generic
    // much like a utility function
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);

            try {
                const resp = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(resp.data.posts);
                    setFetchError(null)
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 1000);
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log("Clean Up function");
            isMounted = false;
            /* Dependency changes */
            source.cancel();
        }
        return cleanUp;


    }, [dataUrl])


    return {
        data,
        fetchError,
        isLoading
    };
}


export default useAxiosFetch;