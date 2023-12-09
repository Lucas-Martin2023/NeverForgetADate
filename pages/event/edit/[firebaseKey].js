import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js for accessing the router object.
import { getSingleEvent } from '../../../api/eventData'; // Import the getSingleEvent function from the specified API file.
import EventForm from '../../../components/forms/EventForm'; // Import the EventForm component from the specified file.

export default function EditEvent() { // Define the EditEvent component function.
  const [editItem, setEditItem] = useState({}); // Declare state variable editItem and a function to update it using the useState hook.
  const router = useRouter(); // Access the router object using the useRouter hook.
  const { firebaseKey } = router.query; // Destructure the 'firebaseKey' property from the query object obtained from the router.

  useEffect(() => { // Use the useEffect hook to perform side effects in the component.
    getSingleEvent(firebaseKey).then(setEditItem); // Fetch details of a single event based on the firebaseKey and update the state with the obtained details.
  }, [firebaseKey]); // Specify that this effect should run whenever the 'firebaseKey' value changes.

  return (<EventForm obj={editItem} />); // Render the EventForm component with the editItem as a prop.
}
