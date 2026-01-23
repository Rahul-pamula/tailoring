import axios from 'axios';

const API_BASE_URL = 'https://rajeshwari-tailoring-backend.onrender.com/shop/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface ApiDesign {
    id: number;
    name: string;
    price: number | null;
    category: string;
    category_display: string;
    description: string;
    images: { id: number; image: string }[];
}

export const getDesigns = async () => {
    const response = await api.get<ApiDesign[]>('/designs/');
    return response.data;
};

export const getReviews = async () => {
    const response = await api.get('/reviews/');
    return response.data;
}

export const submitReview = async (formData: FormData) => {
    const response = await api.post('/reviews/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}
