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
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body className="cardBody">
        <Card.Title>{dateObj.title}</Card.Title>
        <Card.Img variant="top" src={dateObj.image} alt={dateObj.title} style={{ height: '400px' }} />
        <p className="card-text bold">Rating: {dateObj.rating} star</p>
        <p className="card-text bold">{dateObj.description} </p>
        <Link href={`/date/edit/${dateObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteADate} className="m-2">
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
    rating: PropTypes.string,
    description: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default DateCard;
