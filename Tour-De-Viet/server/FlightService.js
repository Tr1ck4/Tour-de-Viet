export function fetchFlights(flightID) {
    return fetch(`${baseUrl}/api/flights/${flightID}`)
      .then(response => response.json())
        .catch(error => {
        console.error('Error fetching comments:', error);
      });
}

export function createFlights(flightID,flightName, startDate, endDate , price , goFrom , arriveAt) {
    const requestData = {
        flightID,
        flightName,
        startDate,
        endDate,
        price,
        goFrom,
        arriveAt
    };

    return fetch(`${baseUrl}/api/flights`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error creating flights:', error);
        });
}

export function updateFlights(flightID,flightName, startDate, endDate , price , goFrom , arriveAt) {
    const modifiedData = {
        flightName,
        startDate,
        endDate,
        price,
        goFrom,
        arriveAt
    };
    return fetch(`${baseUrl}/api/flights/${flightID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(modifiedData)
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error updating flights', error);
        });
}