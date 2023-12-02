/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllDates } from '../api/dateData';
import { useAuth } from '../utils/context/authContext';
import DateCard from '../components/DateCard';

function ShowDates() {
  const [dates, setDates] = useState([]);

  const { user } = useAuth();

  const getAllTheDates = () => {
    getAllDates(user.uid).then(setDates);
  };

  useEffect(() => {
    getAllTheDates();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>My Dates</h1>
      <div className="d-flex flex-wrap">
        {dates.map((date) => (
          <DateCard key={date.firebaseKey} dateObj={date} onUpdate={getAllTheDates} />
        ))}
      </div>
    </div>
  );
}

export default ShowDates;
