/* eslint-disable @next/next/no-img-element */
import React from 'react'; // Import React library for creating React components.
import PropTypes from 'prop-types'; // Import PropTypes library for defining component prop types.
import Button from 'react-bootstrap/Button'; // Import the Button component from the react-bootstrap library.
import Card from 'react-bootstrap/Card'; // Import the Card component from the react-bootstrap library.
import Link from 'next/link'; // Import the Link component from Next.js for navigation.
import { deleteSingleDate } from '../api/dateData'; // Import the deleteSingleDate function from the specified API file

function DateCard({ dateObj, onUpdate }) { // Define the DateCard component function.
  const deleteADate = () => { // Define a function deleteADate to handle the deletion of a date.
    if (window.confirm(`Do you want to delete ${dateObj.title}?`)) { // Display a confirmation dialog before proceeding with the delete operation.
      deleteSingleDate(dateObj.firebaseKey).then(() => onUpdate()); // Call the deleteSingleDate function with the date's firebaseKey and update the parent component.
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}> {/* Container Card with specific styles. */}
      <Card.Body>
        <Card.Title>{dateObj.title}</Card.Title> {/* Render the date title. */}
        <Card.Img variant="top" src={dateObj.image} alt={dateObj.title} style={{ height: '400px' }} />  {/* Render the date image with specific styles. */}
        <p className="card-text bold">Rating: {dateObj.rating} star</p>  {/* Render the date rating as bold text. */}
        <p className="card-text bold">{dateObj.description} </p>  {/* Render the date description as bold text. */}
        <Link href={`/date/edit/${dateObj.firebaseKey}`} passHref> {/* Create a Next.js link for navigation to the date edit page. */}
          <Button variant="info">EDIT</Button>  {/* Render an edit button with Bootstrap styling. */}
        </Link>
        <Button variant="danger" onClick={deleteADate} className="m-2">  {/* Render a delete button with Bootstrap styling, and handle the click event with deleteADate function. */}
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

DateCard.propTypes = { // Prop type validation for the DateCard component.
  dateObj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired, // onUpdate prop is a required function.
};

export default DateCard; // Export the DateCard component as the default export.
