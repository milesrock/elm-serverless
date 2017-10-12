'use strict';


// Init the elm worker
const elmProgram = require('./elmMain');
const elmWorker = elmProgram.ElmMain.worker();


// The lambda global callback
const returner = function(callback, statusCode, message) {
  const response = {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ message: message })
  };
  return callback(null, response);
};

// A lambda function
module.exports.hello = (event, context, callback) => {
  elmWorker.ports.response.subscribe(function(response) {
    returner(callback, response.statusCode, response.message);
  });

  try {
    elmWorker.ports.query.send(event.body);
  } catch (e) {
    returner(callback, 400, "Bad request: invalid input");
  };
};
