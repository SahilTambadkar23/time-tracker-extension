import axios from 'axios';
import { format } from 'date-fns';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchWeeklyData = (startDate, endDate) =>
  API.get('/track/weekly', {
    params: {
      start: format(startDate, 'yyyy-MM-dd'),
      end: format(endDate, 'yyyy-MM-dd')
    }
  });
