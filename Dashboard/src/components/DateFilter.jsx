import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ startDate, setStartDate, endDate, setEndDate }) => (
  <div className="flex space-x-4 mb-4">
    <div>
      <label className="block text-sm font-medium">Start Date</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="border p-2 rounded"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">End Date</label>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        className="border p-2 rounded"
      />
    </div>
  </div>
);

export default DateFilter;
