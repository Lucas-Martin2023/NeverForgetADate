import { getEventDates, getSingleEvent, deleteSingleEvent } from './eventData';
import { getSingleDate, deleteSingleDate } from './dateData';

// This function  takes a firebaseKey as a parameter. It retrieves a date object using the getSingleDate function. Then it uses the getSingleEvent funtion with the retrieved date's eventId to get the associated event object. It returns a promise that resolves to an object containing both the date and event details.
const getDateDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleDate(firebaseKey).then((dateObj) => {
    getSingleEvent(dateObj.eventId).then((eventObject) => {
      resolve({ ...dateObj, eventObject });
    });
  }).catch(reject);
});

// This function is an asynchronous function that takes a firebaseKey as a parameter. It uses 'await' to wait for the result of 'getSingleEvent(firebaseKey)' and assigns it to the variable 'event'. Then it uses 'await' again to wait for the result of 'getEventDates(event.firebaseKey)' and assigns it to the variable 'dates'. It then returns an object containing both the event details and an array of associated dates.
const getEventDetails = async (firebaseKey) => {
  const event = await getSingleEvent(firebaseKey);
  const dates = await getEventDates(event.firebaseKey);

  return { ...event, dates };
};

// This function takes a 'firevaseKey' as a parameter. It uses 'getEventDates' to get an array of dates associated with the event specified by the 'firebaseKey'. It creates an array of promises ('deleteDatePromises'), where each promise corresponds to deleting a single date using 'deleteSingleDate'. It uses 'Promise.all' to wait for all date deletion promises to complete before proceeding. After all dates are deleted, it uses 'deleteSingleEvent' to delete the event itself. The final promise resolves when both the event and its associated dates are successfully deleted.
const deleteEventDatesRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getEventDates(firebaseKey).then((eventDatesArray) => {
    const deleteDatePromises = eventDatesArray.map((date) => deleteSingleDate(date.firebaseKey));

    Promise.all(deleteDatePromises).then(() => {
      deleteSingleEvent(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getDateDetails, getEventDetails, deleteEventDatesRelationship };
