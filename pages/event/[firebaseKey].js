/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getEventDetails } from '../../api/mergedData';
import DateCard from '../../components/DateCard';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  const getEDetails = () => {
    getEventDetails(firebaseKey).then(setEventDetails);
  };

  useEffect(() => {
    getEventDetails(firebaseKey).then(setEventDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="text-center my-4">
        <div className="text-black ms-5 details">
          <h1>
            Event Title: {eventDetails.title}
            <br />
            Event Date: {eventDetails.date}
          </h1>
          <div className="card-container">
            {eventDetails.dates?.map((date) => (
              <DateCard key={date.firebaseKey} dateObj={date} onUpdate={getEDetails} />
            ))}
          </div>
        </div>
        <br />
      </div>
    </>
  );
}
