import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState from the React library.
import { getAllEvents, getEventDates } from '../api/eventData'; // Import the getAllEvents and getEventDates functions from the specified API file.
import { useAuth } from '../utils/context/authContext'; // Import the useAuth hook from the specified context file.
import EventCard from '../components/eventCard'; // Import the EventCard component from the specified file.

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
    <div className="text-center my-4"> {/* Container div with text alignment and margin styles. */}
      <h1>My Events</h1>
      <div className="d-flex flex-wrap"> {/* Container div with display and flex-wrap styles. */}
        {events.map((event) => ( // Map through events array and render an EventCard component for each event.
          <EventCard
            key={event.firebaseKey} // assign a unique identifier (firebaseKey) to the rendered 'EventCard'
            eventObj={event} // Pass the entire 'event' object as the prop named 'eventObj' to the 'EventCard' component.
            onUpdate={getAllTheEvents} // Provide the 'getAllTheEvents' function as a prop named 'onUpdate' to the 'EventCard'. This function is intendeed to be called when an update occurs within the EventCard component.
            imageUrls={event.dates.map((date) => date.image)} // Generate an array of image URLs from the 'dates' property of the 'event' object and pass it as the prop named 'imageUrls' to the 'EventCard component. This array represents images associated with the event's dates.
          />
        ))}
      </div>
    </div>
  );
}

export default ShowEvents;
