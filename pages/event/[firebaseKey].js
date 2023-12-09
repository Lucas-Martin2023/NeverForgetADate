/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js for accessing the router object.
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { getEventDetails } from '../../api/mergedData'; // Import the getEventDetails function from the specified API file.
import DateCard from '../../components/dateCard'; // Import the DateCard component from the specified file.

export default function ViewEvent() { // Define the ViewEvent component function.
  const [eventDetails, setEventDetails] = useState({}); // Declare state variable eventDetails and a function to update it using the useState hook.

  const router = useRouter(); // Access the router object using the useRouter hook.

  const { firebaseKey } = router.query; // Destructure the 'firebaseKey' property from the query object obtained from the router.

  const getEDetails = () => { // Define a function getEDetails to fetch event details and update the state.
    getEventDetails(firebaseKey).then(setEventDetails);
  };

  useEffect(() => { // Use the useEffect hook to perform side effects in the component.
    getEventDetails(firebaseKey).then(setEventDetails); // Fetch event details based on the firebaseKey and update the state with the obtained details.
  }, [firebaseKey]); // Specify that this effect should run whenever the 'firebaseKey' value changes.

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">  {/* Container div with margin and flex-wrap styles. */}
        <div className="text-white ms-5 details"> {/* Container div with text color, margin, and 'details' class styles. */}
          <h5>
            Event Title: {eventDetails.title} {/* Display event title and date. */}
            <br />
            Event Date: {eventDetails.date}
            {eventDetails.dates?.map((date) => ( // Map through dates array and render a DateCard component for each date.
              <DateCard key={date.firebaseKey} dateObj={date} onUpdate={getEDetails} />
            ))}
          </h5>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
