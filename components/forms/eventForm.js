import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createEvent, updateEvent } from '../../api/eventData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  title: '',
  date: '',
};

function EventForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj); // If obj has a firebaseKey (indicating an update), set the formInput state with the obj details. if obj has a firebasekey it will update the form vs if no firebasekey, it will do the create form
  }, [obj, user]); // you are telling useEffect to pay attention to that array and the user is the user that is logged in. it tells ueseffect to run again if anything in dependancy array changes. obj is a dependancy array.

  const handleChange = (e) => { // Define a function handleChange to handle changes in form input. The e is the event of the input
    const { name, value } = e.target; // Extract the name and value from the target.
    setFormInput((prevState) => ({ // whenever something is changed, take the prevstate of what it was and add in what was typed. prevState is a taco.
      ...prevState,
      [name]: value, // these are key value pairs.
    })); // Update the formInput state based on the changed input.
  };

  const handleSubmit = (e) => { // Define a function handleSubmit to handle form submission.
    e.preventDefault(); // Prevent the default form submission behavior. you dont want to lose the values. it prevents the refresh of the page

    if (obj.firebaseKey) { // If obj has a firebaseKey (indicating an update), update the event.
      updateEvent(formInput).then(() => router.push('/events')); // Call the updateEvent function with the formInput and navigate to the events page.
    } else { // If obj does not have a firebaseKey (indicating a new event), create a new event.
      const payload = { ...formInput, uid: user.uid }; // Create a payload object with form input values and the user's uid. this puts the uid in the payload.
      createEvent(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name }; // Create a patchPayload object with the firebaseKey obtained after creating the event. name is not a taco
        updateEvent(patchPayload).then(() => {
          router.push('/events'); // Call the updateEvent function with the patchPayload and navigate to the events page.
        });
      });
    }
  };

  return (
    <>
      <br />
      <h1>Add An Event</h1> {/* Render a heading for the event form. */}
      <Form onSubmit={handleSubmit}> {/* Render a form with the handleSubmit function as the onSubmit handler. */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label> {/* Render a label for the title input. */}
          <Form.Control
            type="text"
            placeholder="Enter Title of Event"
            name="title" // name and value have to be the same
            value={formInput.title}
            onChange={handleChange}
            required
          /> {/* Render an input field for the title with specific attributes and event handlers. */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Date</Form.Label> {/* Render a label for the date input. */}
          <Form.Control
            type="date"
            format="MM/dd/yyyy"
            placeholder="Enter Date of Event"
            name="date"
            value={formInput.date}
            onChange={handleChange}
            required
          /> {/* Render an input field for the date with specific attributes and event handlers. */}
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Event' : 'Submit Event'}
        </Button> {/* Render a submit button with a variant based on whether it's an update or a new event. */}
      </Form>
    </>
  );
}

EventForm.propTypes = { // Defines prop types for the EventForm component. validating the object
  obj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = { // Set default props for the EventForm component. you need default prop types bc they aren't required
  obj: intialState,
};

export default EventForm; // Export the EventForm component as the default export of this module.
