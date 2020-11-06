// require('dotenv').config();
// Load the SDK and UUID
var AWS = require('aws-sdk');
var uuid = require('uuid');


// const AWSConfig = {
//     accessKeyId: "AKIAUYHPR2AHNCHJDPGL",
//     accessSecretKey: "5ugRR2xTyp5bwAiKZG0rFl6TJUorf9cwSdH3uXXR"
// }
// AWS.config.update(AWSConfig);

// Create unique bucket name
var bucketName = 'node-js-sdk-sample-' + uuid.v4();
// Create name for uploaded object key
var keyName = 'hello_alfheimr.txt';

// Create a promise on S3 service object
var bucketPromise = new AWS.S3({apiVersion: '2006-03-01'}).createBucket({Bucket: bucketName}).promise();

// Handle promise fulfilled/rejected states
bucketPromise.then(
  function(data) {
    // Create params for putObject call
    var objectParams = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
    // Create object upload promise
    var uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
    uploadPromise.then(
      function(data) {
        console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
      });
}).catch(
  function(err) {
    console.error(err, err.stack);
});