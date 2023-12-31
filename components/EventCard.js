/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteEventDatesRelationship } from '../api/mergedData';

function EventCard({ eventObj, onUpdate, imageUrls }) {
  const deleteEvent = () => {
    if (window.confirm(`Do you want to delete ${eventObj.title}?`)) {
      deleteEventDatesRelationship(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="eventDateCard">
      <Card.Body className="cardBody" style={{ width: '18rem', margin: '10px', borderRadius: '10px' }}>
        <Card.Title style={{ textDecoration: 'underline' }}>{eventObj.title}</Card.Title>
        <p className="card-text bold">{eventObj.date} </p>
        {imageUrls.map((imageUrl, index) => (
          <img
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            src={imageUrl}
            alt={`${eventObj.title} - Date ${index + 1}`}
            className="card-img-top"
            style={
              {
                width: '200px', height: '150px', margin: '5px', borderRadius: '10px',
              }
            }
          />
        ))}
        <Link href={`/event/${eventObj.firebaseKey}`} passHref>
          <Button className="view-button" variant="primary">VIEW</Button>
        </Link>
        <Link href={`/event/edit/${eventObj.firebaseKey}`} passHref>
          <Button className="edit-button" variant="info">EDIT</Button>
        </Link>
        <Button className="delete-button" variant="danger" onClick={deleteEvent}>DELETE</Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EventCard;
