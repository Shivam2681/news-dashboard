import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export async function getTopHeadlines(params?: {
  category?: string;
  q?: string;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}) {
  try {
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/top-headlines`, {
      params: {
        country: 'us',
        apiKey: NEWS_API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}

export async function searchNews(params: {
  q: string;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}) {
  try {
    const response = await axios.get<NewsResponse>(`${NEWS_API_BASE_URL}/everything`, {
      params: {
        apiKey: NEWS_API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
}