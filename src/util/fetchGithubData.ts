import axios from 'axios';

export const fetchGithubData = async (url: string) => {
    try {
        const response = process.env.REACT_APP_GITHUB_API_TOKEN ? await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
            }
        }) : await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
