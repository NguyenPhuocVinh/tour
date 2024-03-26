import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, isTourDetail = false) => {
    const [data, setData] = useState([]);
    const [tour, setTour] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await axios.get(url);

                if (res.status !== 200) {
                    throw new Error('Failed to fetch data');
                }

                if (isTourDetail) {
                    setTour(res.data.tour);
                }
                else {
                    setData(res.data.tours);
                }

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [url, isTourDetail]);

    return {
        data: isTourDetail ? tour : data,
        error,
        loading,
        // tourCount 
    };
};

export default useAxios;
