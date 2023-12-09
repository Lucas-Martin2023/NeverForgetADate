/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { getAllDates } from '../api/dateData'; // Import the getAllDates function from the specified API file.
import { useAuth } from '../utils/context/authContext'; // Import the useAuth hook from the specified context file.
import DateCard from '../components/dateCard'; // Import the DateCard component from the specified file.

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
