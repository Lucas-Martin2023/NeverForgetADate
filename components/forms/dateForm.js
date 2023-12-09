import React, { useEffect, useState } from 'react'; // Import React library for creating React components.
import { useRouter } from 'next/router'; // Import the useRouter hook from Next.js for accessing the router object.
import PropTypes from 'prop-types'; // Import PropTypes library for defining component prop types.
import { Button, Form } from 'react-bootstrap'; // Import Button and Form components from the react-bootstrap library.
import { getAllEvents } from '../../api/eventData'; // Import the getAllEvents function from the specified API file.
import { createDate, updateDate, getAllDates } from '../../api/dateData'; // Import createDate, updateDate, and getAllDates functions from the specified API file.
import { useAuth } from '../../utils/context/authContext'; // Import the useAuth hook from the specified context file.

const intialState = { // Define the initial state for formInput.
  title: '',
  image: '',
  rating: '',
  description: '',
};
// defining state variables, pulling in router and pulling in user.
function DateForm({ obj }) { // Define the DateForm component function, which takes one prop: obj.
  const [formInput, setFormInput] = useState(intialState); // Define state variable formInput to manage form input values, initialized with intialState. form input is initial state, setforminput is what it is changed to.
  const [setDates] = useState([]); // Define state variable dates to manage an array of dates.
  const router = useRouter(); // Access the router object using the useRouter hook.
  const { user } = useAuth(); // Access the user object from the authentication context using the useAuth hook.... fetch and find the user. this is how we get the user data
  const [events, setEvents] = useState([]); // Define state variable events to manage an array of events.

  useEffect(() => { // Fetch events associated with the user when the user changes. This is used later for my dropdown.
    getAllEvents(user.uid).then(setEvents);
  }, [user]); // pay attention to who the user is

  useEffect(() => { // Fetch all dates associated with the user and update the dates state.**
    getAllDates(user.uid).then(setDates);
    if (obj.firebaseKey) { // it will update the form vs if no firebasekey, it will do the create form
      setFormInput(obj); // If obj has a firebaseKey (indicating an update), set the formInput state with the obj details.
    }
  }, [obj, user]);

  const handleChange = (e) => { // Define a function handleChange to handle changes in form input. The e is the event of the input
    const { name, value } = e.target; // Extract the name and value from the target element.
    setFormInput((prevState) => ({ // whenver something is changed, take the prevstate of what it was and add in what was typed. taco
      ...prevState,
      [name]: value, // key value pair
    })); // Update the formInput state based on the changed input.
  };

  const handleSubmit = (e) => { // Define a function handleSubmit to handle form submission.
    e.preventDefault(); // Prevent the default form submission behavior.

    const payload = { // Create a payload object with form input values and the user's uid.
      ...formInput,
      uid: user.uid,
    };

    if (obj.firebaseKey) { // If obj has a firebaseKey (indicating an update), update the date.
      updateDate(payload).then(() => router.push('/dates/')); // Call the updateDate function with the payload and navigate to the dates page.
    } else { // If obj does not have a firebaseKey (indicating a new date), create a new date.
      createDate(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name }; // Create a patchPayload object with the firebaseKey obtained after creating the date.
        updateDate(patchPayload).then(() => {
          router.push('/dates'); // Call the updateDate function with the patchPayload and navigate to the dates page.
        });
      });
    }
  };

  return (
    <>
      <br />
      <h1>Add A Date</h1> {/* Render a heading for the date form. */}
      <Form onSubmit={handleSubmit}> {/* Render a form with the handleSubmit function as the onSubmit handler. */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter a title for the date:</Form.Label> {/* Render a label for the title input. */}
          <Form.Control
            type="text"
            placeholder="Enter Title of Date"
            name="title" // name and value have to be the same.
            value={formInput.title}
            onChange={handleChange}
            required
          /> {/* Render an input field for the title with specific attributes and event handlers. */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Put a picture from the date:</Form.Label> {/* Render a label for the image input. */}
          <Form.Control
            type="url"
            placeholder="Enter Date Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />  {/* Render an input field for the image with specific attributes and event handlers. */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Rate the date from 1-5:</Form.Label> {/* Render a label for the rating input. */}
          <Form.Control
            type="text"
            placeholder="Enter Date Rating"
            name="rating"
            value={formInput.rating}
            onChange={handleChange}
            required
          /> {/* Render an input field for the rating with specific attributes and event handlers. */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Tell us about the date:</Form.Label> {/* Render a label for the description input. */}
          <Form.Control
            type="text"
            placeholder="Enter Date Description"
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          /> {/* Render an input field for the description with specific attributes and event handlers. */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Was this date part of an event:</Form.Label> {/* Render a label for the eventId select input. */}
          <Form.Control
            name="eventId"
            value={formInput.eventId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select an event</option> {/* Render an option for selecting an event. */}
            {events.map((event) => (
              <option key={event.firebaseKey} value={event.firebaseKey}>
                {event.title}
              </option>
            ))} {/* Map through events and render options based on event details. */}
          </Form.Control>
          {/* Render a select input for choosing an event with specific attributes and event handlers. */}
        </Form.Group>

        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Date' : 'Submit Date'}
        </Button> {/* Render a submit button with a variant based on whether it's an update or a new date. Ternary operator, conditional statment,  */}
      </Form>
    </>
  );
}

DateForm.propTypes = { // Define prop types for the DateForm component. validating your objects
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
}; // Set default props for the DateForm component.

export default DateForm; // Export the DateForm component as the default export of this module.
