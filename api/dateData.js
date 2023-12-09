// imports credentials from another file
import { clientCredentials } from '../utils/client';

// storing the database URL in a variable
const endpoint = clientCredentials.databaseURL;

const getAllDates = (uid) => new Promise((resolve, reject) => { // function to get all dates for a user
  fetch(`${endpoint}/dates.json?orderBy="uid"&equalTo="${uid}"`, { // Fetching data from the server based on the user ID
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json()) // handling the response by converting it to JSON
    .then((data) => { // resolving the Promise with the dates if available, or an empty array if not
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject); // handling errors by rejecting the Promise
});

const getSingleDate = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dates/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createDate = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dates.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateDate = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dates/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSingleDate = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dates/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getDatesForEvent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/dates.json?orderBy="eventId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllDates,
  getSingleDate,
  createDate,
  updateDate,
  deleteSingleDate,
  getDatesForEvent,
};
