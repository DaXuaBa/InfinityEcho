import React, { useState, useEffect } from 'react';
import moment from 'moment';

const ElectionSummary = () => {
  const [summary, setSummary] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/get_summary');
      const data = await response.json();
      setSummary(data.SUMMARY);
      // Định dạng lại thời gian bằng Moment.js
      const formattedCreatedAt = moment(data.CREATED_AT).format('DD MMM YYYY HH:mm:ss');
      setCreatedAt(formattedCreatedAt);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-md p-8">
                <p className="text-2xl font-bold mb-4">Election Summary</p>
                <p className="mt-2 mb-6 text-gray-700">{summary}</p>
                <p className=" text-gray-700 inline-block">Updated: {createdAt}</p>
            </div>
        </div>
    );  
};

export default ElectionSummary;
