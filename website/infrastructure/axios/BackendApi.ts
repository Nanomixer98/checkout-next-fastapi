import axios from 'axios';

export default class BackendApi {
  private static axiosInstance = axios.create({
    // baseURL: `https://${process.env.BACKEND_URL}/api/v1`,
    baseURL: 'http://localhost:8000/api/v1',
  });

  public static getInstance() {
    return this.axiosInstance;
  }
}
