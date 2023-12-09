/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js for accessing the router object.
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { getDateDetails } from '../../api/mergedData'; // Import the getDateDetails function from the specified API file.

export default function ViewDate() { // Define the ViewDate component function.
  const [dateDetails, setDateDetails] = useState({}); // Declare state variable dateDetails and a function to update it using the useState hook.

  const router = useRouter(); // Access the router object using the useRouter hook.

  const { firebaseKey } = router.query; // Destructure the 'firebaseKey' property from the query object obtained from the router.

  useEffect(() => { // Use the useEffect hook to perform side effects in the component.
    getDateDetails(firebaseKey).then(setDateDetails); // Fetch date details based on the firebaseKey and update the state with the obtained details.
  }, [firebaseKey]); // Specify that this effect should run whenever the 'firebaseKey' value changes.

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column"> {/* Container div with margin and flex-wrap styles. */}
          <img src={dateDetails.image} alt={dateDetails.title} style={{ width: '300px' }} /> {/* Render an image with source and alt text based on dateDetails. */}
        </div>
        <div className="text-white ms-5 details">  {/* Container div with text color, margin, and 'details' class styles. */}
          <h5>
            {dateDetails.title}
          </h5>
          {dateDetails.image}
          <p>{dateDetails.description || ''}</p> {/* Render the description from dateDetails or an empty string if it's falsy. */}
          <br />
        </div>
      </div>
    </>
  );
}
