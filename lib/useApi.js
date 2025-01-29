import { useState, useEffect } from "react";
const useApi = (fn) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await fn();
        setData(response);
    } catch (err) {
        console.log("error");
        
    } finally {
        setIsLoading(false);
        }
    }
    useEffect(() =>{
        fetchData();
    },[])

    const refetch = () => fetchData();
    return {data, isLoading, error ,refetch};
}

export default useApi;