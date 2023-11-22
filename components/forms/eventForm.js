import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent, getAllEvents } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  title: '',
  date: '',
};

function EventForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllEvents(user.uid).then(setEvents);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateEvent(formInput).then(() => router.push('/events/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createEvent(payload).then(({ title }) => {
        const patchPayload = { firebaseKey: title };

        updateEvent(patchPayload).then(() => {
          router.push('/events');
        });
      });
    }
  };

  return (
    <>
      <br />
      <h1>Add An Event</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title of Event"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Date of Event"
            name="date"
            value={formInput.date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Event' : 'Submit Event'}
        </Button>
      </Form>
    </>
  );
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: intialState,
};

export default EventForm;
