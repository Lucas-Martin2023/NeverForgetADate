import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleDate } from '../../../api/dateData';
import DateForm from '../../../components/forms/DateForm';

export default function EditDate() { // Define the EditDate component function.
  const [editItem, setEditItem] = useState({}); // Declare state variable editItem and a function to update it using the useState hook.
  const router = useRouter(); // Access the router object using the useRouter hook.
  const { firebaseKey } = router.query; // Destructure the 'firebaseKey' property from the query object obtained from the router.

  useEffect(() => { // Use the useEffect hook to perform side effects in the component.
    getSingleDate(firebaseKey).then(setEditItem); // Fetch details of a single date based on the firebaseKey and update the state with the obtained details.
  }, [firebaseKey]); // Specify that this effect should run whenever the 'firebaseKey' value changes.

  return (<DateForm obj={editItem} />); // Render the DateForm component with the editItem as a prop.
}
