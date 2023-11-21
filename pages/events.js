/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../api/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/eventCard';

function ShowEvents() {
  const [events, setEvents] = useState([]);

  const { user } = useAuth();

  const getAllTheEvents = () => {
    getAllEvents(user.uid).then(setEvents);
  };

  useEffect(() => {
    getAllTheEvents();
  }, []);

  return (
    <div className="text-center my-4">
      <h1>My Events</h1>
      <div className="d-flex flex-wrap">
        {events.map((event) => (
          <EventCard key={event.firebaseKey} eventObj={event} onUpdate={getAllTheEvents} />
        ))}
      </div>
    </div>
  );
}

export default ShowEvents;
