/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { getAllDates } from '../api/dateData'; // Import the getAllDates function from the specified API file.
import { useAuth } from '../utils/context/authContext'; // Import the useAuth hook from the specified context file.
import DateCard from '../components/dateCard'; // Import the DateCard component from the specified file.

function ShowDates() { // Define the ShowDates component function.
  const [dates, setDates] = useState([]); // Declare state variable dates and a function to update it using the useState hook.

  const { user } = useAuth(); // Access the user object from the authentication context using the useAuth hook.

  const getAllTheDates = () => { // Define a function getAllTheDates to fetch all dates for the current user and update the state.
    getAllDates(user.uid).then(setDates);
  };

  useEffect(() => { // Use the useEffect hook to perform side effects in the component.
    getAllTheDates(); // Fetch all dates for the current user and update the state when the component mounts.
  }, []); // Specify an empty dependency array to ensure the effect runs only once when the component mounts.

  return (
    <div className="text-center my-4"> {/* Container div with text alignment and margin styles. */}
      <h1>My Dates</h1>
      <div className="d-flex flex-wrap">  {/* Container div with display and flex-wrap styles. */}
        {dates.map((date) => ( // Map through dates array and render a DateCard component for each date.
          <DateCard key={date.firebaseKey} dateObj={date} onUpdate={getAllTheDates} />
          // Renders the DateCard component and assigns a unique identifier (firebaseKey) to the rendered DateCard.
          // It passes the entire date object as the prop named dateObj to the DateCard component
          // It provides the getAllTheDates function as a prop named onUpdate to the DateCard. This function is intended to be called when an update occurs within the DateCard component.
        ))}
      </div>
    </div>
  );
}

export default ShowDates;
