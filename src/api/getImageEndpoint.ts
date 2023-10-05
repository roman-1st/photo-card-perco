import axios from "axios";
import {Image} from "../types";

export async function getImageEndpoint (page: number, title: string):Promise<Image[]> {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos?', {
            params: {
                client_id: 'Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs',
                query: title,
                page: page,
                per_page: '30',
                lang: 'ru',
            }
        })
        if (response.status === 200) {
            return response.data.results
        }

    } catch (e: any) {
        console.error(e.message);
    }
    return []
}