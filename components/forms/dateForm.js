import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { getAllEvents } from '../../api/eventData';
import { createDate, updateDate, getAllDates } from '../../api/dateData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  title: '',
  image: '',
  rating: '',
  description: '',
};

function DateForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const [setDates] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents(user.uid).then(setEvents);
  }, [user]);

  useEffect(() => {
    getAllDates(user.uid).then(setDates);
    if (obj.firebaseKey) {
      setFormInput(obj);
    }
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

    const payload = {
      ...formInput,
      uid: user.uid,
    };

    if (obj.firebaseKey) {
      updateDate(payload).then(() => router.push('/dates/'));
    } else {
      createDate(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateDate(patchPayload).then(() => {
          router.push('/dates');
        });
      });
    }
  };

  return (
    <>
      <br />
      <h1>Add A Date</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter a title for the date:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title of Date"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Put a picture from the date:</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Date Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rate the date from 1-5:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Date Rating"
            name="rating"
            value={formInput.rating}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tell us about the date:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Date Description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Was this date part of an event:</Form.Label>
          <Form.Control
            as="select"
            name="eventId"
            value={formInput.eventId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an event</option>
            {events.map((event) => (
              <option key={event.firebaseKey} value={event.firebaseKey}>
                {event.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Date' : 'Submit Date'}
        </Button>
      </Form>
    </>
  );
}

DateForm.propTypes = {
  obj: PropTypes.shape({
    eventId: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

DateForm.defaultProps = {
  obj: intialState,
};

export default DateForm;
