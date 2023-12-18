import React, { useEffect, useState } from 'react';
import { getAllEvents, getEventDates } from '../api/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/EventCard';

function ShowEvents() {
  const [events, setEvents] = useState([]);

  const { user } = useAuth();

  const getAllTheEvents = async () => {
    const eventsData = await getAllEvents(user.uid);
    const eventsWithDates = await Promise.all(
      eventsData.map(async (event) => {
        const dates = await getEventDates(event.firebaseKey);
        return { ...event, dates };
      }),
    );
    setEvents(eventsWithDates);
  };

  useEffect(() => {
    getAllTheEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center my-4">
      <h1>❤️My Events❤️</h1>
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
