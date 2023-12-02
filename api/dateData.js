// imports credentials from another file
import { clientCredentials } from '../utils/client';

// storing the database URL in a variable
const endpoint = clientCredentials.databaseURL;

// function to get all dates for a user
const getAllDates = (uid) => new Promise((resolve, reject) => {
  // Fetching data from the server based on the user ID
  fetch(`${endpoint}/dates.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // handling the response by converting it to JSON
    .then((response) => response.json())
    // resolving the Promise with the dates if available, or an empty array if not
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    // handling errors by rejecting the Promise
    .catch(reject);
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
