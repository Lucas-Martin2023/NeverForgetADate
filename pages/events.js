import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { getAllEvents, getEventDates } from '../api/eventData'; // Import the getAllEvents and getEventDates functions from the specified API file.
import { useAuth } from '../utils/context/authContext'; // Import the useAuth hook from the specified context file.
import EventCard from '../components/EventCard'; // Import the EventCard component from the specified file.

function ShowEvents() { // Define the ShowEvents component function.
  const [events, setEvents] = useState([]); // Declare state variable events and a function to update it using the useState hook.

  const { user } = useAuth(); // Access the user object from the authentication context using the useAuth hook.

  const getAllTheEvents = async () => { // Define an asynchronous function getAllTheEvents to fetch all events for the current user.
    const eventsData = await getAllEvents(user.uid); // Fetch all events for the current user.
    const eventsWithDates = await Promise.all( // Use Promise.all to concurrently fetch event dates for each event.
      eventsData.map(async (event) => { // This part uses the map function to iterate over each element in the eventsData array. For each element (an event), the provided function is applied.
        const dates = await getEventDates(event.firebaseKey); // Fetch event dates for the current event.
        return { ...event, dates }; // Return a new object combining the event data with its dates.
      }),
    );
    setEvents(eventsWithDates); // Update the state with the events and their dates.
  };

  useEffect(() => { // Use the useEffect hook to perform side effects in the component.
    getAllTheEvents(); // Fetch all events for the current user and update the state when the component mounts.
  }, []); // Specify an empty dependency array to ensure the effect runs only once when the component mounts.

  return (
    <div className="text-center my-4">
      <h1>My Events</h1>
      <div className="d-flex flex-wrap">
        {events.map((event) => (
          <EventCard
            key={event.firebaseKey}
            eventObj={event}
            onUpdate={getAllTheEvents}
            imageUrls={event.dates.map((date) => date.image)}
          />
        ))}
      </div>
    </div>
  );
}

export default ShowEvents;
