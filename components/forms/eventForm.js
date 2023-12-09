import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js for accessing the router object.
import PropTypes from 'prop-types'; // Import PropTypes library for defining component prop types.
import { Button, Form } from 'react-bootstrap'; // Import Button and Form components from the react-bootstrap library.
import { createEvent, updateEvent, getAllEvents } from '../../api/eventData'; // Import createEvent, updateEvent, and getAllEvents functions from the specified API file.
import { useAuth } from '../../utils/context/authContext'; // Import the useAuth hook from the specified context file.

const intialState = { // Defines the initial state for formInput.
  title: '',
  date: '',
};

// defining state variables, pulling in router and pulling in user.
function EventForm({ obj }) { // Define the EventForm component function, which takes one prop: obj. destructuring is happening. you are saying what you need from the object.
  const [formInput, setFormInput] = useState(intialState); // Define state variable formInput to manage form input values, initialized with initialState. form input is initial state, setforminput is what it is changed to. state management for the component.
  const [setEvents] = useState([]); // Define state variable events to manage an array of events.
  const router = useRouter(); // Access the router object using the useRouter hook.
  const { user } = useAuth(); // Access the user object from the authentication context using the useAuth hook... fetch and find the user. this is how we get the user data. destructuring is happening.

  useEffect(() => {
    getAllEvents(user.uid).then(setEvents); // Fetch events associated with the user when the user changes.
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
      updateEvent(formInput).then(() => router.push('/events/')); // Call the updateEvent function with the formInput and navigate to the events page.
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
