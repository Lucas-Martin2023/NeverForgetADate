/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleDate } from '../api/dateData';

function DateCard({ dateObj, onUpdate }) {
  const deleteADate = () => {
    if (window.confirm(`Do you want to delete ${dateObj.title}?`)) {
      deleteSingleDate(dateObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="eventDateCard">
      <Card.Body className="cardBody" style={{ width: '18rem', margin: '10px', borderRadius: '10px' }}>
        <Card.Title style={{ textDecoration: 'underline' }}>{dateObj.title}</Card.Title>
        <div className="card-image-container">
          <Card.Img variant="top" src={dateObj.image} alt={dateObj.title} className="card-image" style={{ width: '200px', height: '150px', borderRadius: '10px' }} />
        </div>
        <p className="card-text bold">Rating: {dateObj.rating} star</p>
        <p className="card-text bold">{dateObj.description} </p>
        <Link href={`/date/edit/${dateObj.firebaseKey}`} passHref>
          <Button className="edit-button" variant="info">EDIT</Button>
        </Link>
        <Button className="delete-button" variant="danger" onClick={deleteADate}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

DateCard.propTypes = {
  dateObj: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DateCard;
