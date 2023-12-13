/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getDateDetails } from '../../api/mergedData';

export default function ViewDate() {
  const [dateDetails, setDateDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getDateDetails(firebaseKey).then(setDateDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={dateDetails.image} alt={dateDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="ms-5 details">
          <h5>
            {dateDetails.title}
          </h5>
          {dateDetails.image}
          <p>{dateDetails.description || ''}</p>
          <br />
        </div>
      </div>
    </>
  );
}
