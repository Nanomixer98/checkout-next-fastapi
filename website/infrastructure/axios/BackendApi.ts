import axios from 'axios';

export default class BackendApi {
  private static axiosInstance = axios.create({
    // baseURL: `https://${process.env.BACKEND_URL}/`,
    baseURL: 'https://localhost:8000/',
  });

  public static getInstance() {
    return this.axiosInstance;
  }
}
