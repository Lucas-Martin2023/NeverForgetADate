/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getEventDetails } from '../../api/mergedData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getEventDetails(firebaseKey).then(setEventDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="text-white ms-5 details">
          <h5>
            Event Title: {eventDetails.title}
            <br />
            Event Date: {eventDetails.date}
          </h5>
          <br />
        </div>
        <br />
      </div>
    </>
  );
}
