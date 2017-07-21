/*
  HTTP Client making a GET request and outputting its response. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_get_options_callback
*/

// Import the `http` module.
const http = require('http');

// Initialize the array containing the chunks of the result.
let chunks = [];

// Define a function to add a chunk to the array.
const processChunk = chunk => {chunks.push(chunk);};

/*
  Define a function to create a listener for “data” events emitted by a
  specified Readable Stream and make processChunk process their chunks. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_data
*/
const dataListen = readable => {readable.on('data', processChunk);};

/*
  Define a function to return a function that calls an already specified
  function to process a response that will be specified. See:
  https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_request_options_callback.
*/
const responseListenerFn = (endCallback) => {
  return response => {
    // Identify the status of the response.
    const status = response.statusCode;
    // If the status is other than OK:
    if (status !== 200) {
      // Identify an error and its message.
      const err = new Error('Failed with status ' + status);
      // Output its message.
      console.error(err.message);
      // Consume the response.
      response.resume();
      // Quit.
      return;
    }
    // Otherwise, i.e. if the status is OK:
    else {
      /*
        Set the character encoding of the response to force its data to be
        interpreted as UTF-8 text and converted from buffers to strings. See:
        https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_setencoding_encoding
      */
      response.setEncoding('utf-8');
      // Create a listener for “data” events emitted by the response.
      dataListen(response);
      /*
        Create a one-time listener for an “end” event emitted by the response.
        See:
        https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_end
      */
      response.once('end', endCallback);
    }
  };
};

const hget = (url, endCallback) => {
  /*
    Perform a GET request to a specified URL and call the specified function
    to process its response. See:
    https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_http_get_options_callback
    https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_event_error
  */
  http.get(url, responseListenerFn(endCallback)).on(
    'error',
    err => console.error('Error: ' + err.message)
  );
};

/*
  Define a function to return the first argument or, if the argument count
  is not 1, the argument is not a string, or the argument is a blank string,
  undefined.
*/
const arg0IfValid = () => {
  // Identify the command-line arguments.
  const args = process.argv.slice(2);
  // Return the first if it is the only argument and nonblank.
  if (args.length === 1 && typeof args[0] === 'string' && args[0].length) {
    return args[0];
  }
};

exports.chunks = chunks;
exports.processChunk = processChunk;
exports.dataListen = dataListen;
exports.responseListener = responseListenerFn;
exports.hget = hget;
exports.arg0IfValid = arg0IfValid;
