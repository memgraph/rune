import axios from 'axios';

export const fetchData = async (url: string, data?: object) => {
    try {
        const response = data && Object.keys(data).length > 0 ? await axios.post(url, data) : await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
