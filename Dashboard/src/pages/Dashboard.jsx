import React, { useState } from 'react';
import WeeklyChart from '../components/WeeklyChart';
import BreakdownCard from '../components/BreakdownCard';
import DateFilter from '../components/DateFilter';
import { fetchWeeklyData } from '../services/api';

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 86400000));
  const [endDate, setEndDate] = useState(new Date());
  const [rawData, setRawData] = useState([]);

  React.useEffect(() => {
    fetchWeeklyData(startDate, endDate).then(res => setRawData(res.data));
  }, [startDate, endDate]);

  return (
    <div className="p-6 space-y-6">
      <DateFilter {...{ startDate, setStartDate, endDate, setEndDate }} />
      <WeeklyChart {...{ startDate, endDate }} />
      <BreakdownCard data={rawData} />
    </div>
  );
};

export default Dashboard;
