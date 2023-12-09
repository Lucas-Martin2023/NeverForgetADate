/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEventDatesRelationship } from '../api/mergedData';
// Import the deleteEventDatesRelationship function from the specified API file.

function EventCard({ eventObj, onUpdate, imageUrls }) { // Define the EventCard component function, which takes three props: eventObj, onUpdate, and imageUrls.
  const deleteEvent = () => { // Define a function deleteEvent within the component.
    if (window.confirm(`Do you want to delete ${eventObj.title}?`)) { // Display a confirmation dialog with the event title and proceed if the user confirms.
      deleteEventDatesRelationship(eventObj.firebaseKey).then(() => onUpdate()); // Call the deleteEventDatesRelationship function with the event's firebaseKey, then trigger the onUpdate callback.
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}> {/* Render a Card component with specific inline styles. */}
      <Card.Body> {/* Render the body of the Card. */}
        <Card.Title>{eventObj.title}</Card.Title> {/* Display the title of the event within the Card. */}
        <p className="card-text bold">{eventObj.date} </p> {/* Display the date of the event within the Card. */}
        {imageUrls.map((imageUrl, index) => ( // Map through imageUrls array and render an img element for each URL.
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={index} // Set the key attribute with the index value.
            src={imageUrl} // Set the source URL for the image.
            alt={`${eventObj.title} - Date ${index + 1}`} // Set the alt attribute for accessibility.
            className="card-img-top" // Apply a CSS class to the img element.
            style={{ width: '200px', height: '150px', margin: '5px' }} // Apply inline styles to the img element.
          />
        ))}
        <Link href={`/event/${eventObj.firebaseKey}`} passHref> {/* Define a Next.js link to navigate to the detailed view of the event. */}
          <Button variant="primary" className="m-2">VIEW</Button> {/* Render a primary variant Button for viewing the event. */}
        </Link>
        <Link href={`/event/edit/${eventObj.firebaseKey}`} passHref> {/* Define a Next.js link to navigate to the edit view of the event. */}
          <Button variant="info">EDIT</Button> {/* Render an info variant Button for editing the event. */}
        </Link>
        <Button variant="danger" onClick={deleteEvent} className="m-2"> {/* Render a danger variant Button for deleting the event, with the deleteEvent function as the onClick handler. */}
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}
// Specify prop types for type-checking during development and documentation.
EventCard.propTypes = {
  eventObj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired, // onUpdate prop is a required function.
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired, // this is a is enforcing that the imageUrls prop should be an array of strings and is a required prop for the EventCard component
};

// Export the EventCard component as the default export of this module.
export default EventCard;
