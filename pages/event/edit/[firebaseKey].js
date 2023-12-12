import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../../api/eventData';
import EventForm from '../../../components/forms/EventForm';

export default function EditEvent() {
  const [editEventItem, setEditEventItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleEvent(firebaseKey).then(setEditEventItem);
  }, [firebaseKey]);

  return (<EventForm obj={editEventItem} />);
}
