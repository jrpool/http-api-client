/*
  HTTP Client making a GET request for the weather in a specified city to
  Open Weather Map and outputting the temperature from the response.
*/

// Import the `hget` module.
const hgetMod = require('./hget');

// Identify its objects.
let {chunks} = hgetMod;
let {processChunk, dataListen, responseListener, hget, arg0IfValid} = hgetMod;

// Identify the request parameters.
const requestParams = {
  url: 'http://api.openweathermap.org/data/2.5/weather',
  q: '',
  mode: 'json',
  appid: '498fa131dbb425c13df97463ab9d22dd'
};

/*
  Define a function to extract the temperature from an array of the chunks of
  a response from Open Weather Map.
*/
const getTemp = () => {
  // Combine and JSON-parse the chunks and identify the resulting object.
  const responseObject = JSON.parse(chunks.join(''));
  // Initialize a report object.
  const reportObject = {};
  // Add the temperature to it in Kelvin, Celsius, and Fahrenheit scales.
  reportObject['Kelvin'] = Number.parseFloat(responseObject['main']['temp']);
  reportObject['Celsius'] = reportObject['Kelvin'] - 273.15;
  reportObject['Fahrenheit']
    = (9 * reportObject['Kelvin'] / 5 - 459.67).toPrecision(2);
  // Return the report object.
  return reportObject;
};

// Define a function to output a report of the requested temperature.
const tempReport = () => {
  const temps = getTemp();
  for (const scale of ['Kelvin', 'Celsius', 'Fahrenheit']) {
    console.log('Temperature in ' + scale + ': ' + temps[scale]);
  }
}

/*
  Perform a GET request to the URL specified on the command line, if valid,
  and process its response.
*/
const city = arg0IfValid();
if (city) {
  requestParams['q'] = city;
  const urlWithQuery
    = requestParams['url']
    + '?'
    + ['q', 'mode', 'appid'].map(v => v + '=' + requestParams[v]).join('&');
  hget(urlWithQuery, tempReport);
}
