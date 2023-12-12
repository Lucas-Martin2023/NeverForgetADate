import { getEventDates, getSingleEvent, deleteSingleEvent } from './eventData';
import { getSingleDate, deleteSingleDate } from './dateData';

const getDateDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleDate(firebaseKey).then((dateObj) => {
    getSingleEvent(dateObj.eventId).then((eventObject) => {
      resolve({ ...dateObj, eventObject });
    });
  }).catch(reject);
});

const getEventDetails = async (firebaseKey) => {
  const event = await getSingleEvent(firebaseKey);
  const dates = await getEventDates(event.firebaseKey);

  return { ...event, dates };
};

const deleteEventDatesRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getEventDates(firebaseKey).then((eventDatesArray) => {
    const deleteDatePromises = eventDatesArray.map((date) => deleteSingleDate(date.firebaseKey));

    Promise.all(deleteDatePromises).then(() => {
      deleteSingleEvent(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getDateDetails, getEventDetails, deleteEventDatesRelationship };
