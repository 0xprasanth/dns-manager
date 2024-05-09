import axios from 'axios';
import { Record, DNS} from '../types/index';

export const fetchDNSRecords = async (accessToken) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/domain/records`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    if(response.status === 200 || response.status === 201)
        return response.data.data;
    else
        throw new Error(`Request failed with status code ${response.status}`)
}