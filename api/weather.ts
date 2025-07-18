import axios from 'axios';
import { LocationForecast } from 'components/HomeComponent';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

const baseRequest = axios.create({
  baseURL: 'http://api.weatherapi.com/v1',
  timeout: 20000,
});

export async function getForecastData(query: string) {
  try {
    const response = await baseRequest.get('/forecast.json', {
      params: {
        key: API_KEY,
        q: query,
        days: 14,
        aqi: 'no',
        alerts: 'no',
      },
    });
    return response.data;
  } catch (error) {
    return alert((error as Error).message);
  }
}

export async function getLocationData(query: string) {
  try {
    const response = await baseRequest.get('/search.json', {
      params: {
        key: API_KEY,
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    return alert((error as Error).message);
  }
}
