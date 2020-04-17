const functions =require('firebase-functions');
const admin = require('firebase-admin');
const app = admin.initializeApp(); 

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase! Special thanks @Marco");
});

exports.randomize = functions.https.onRequest(async (req, res) => {
  app.database().ref('speed').set(Math.random()).then(function() {
      console.log("Element successfully written in 'speed'!");
      return res.status(200).send("Success");
    })
    .catch(function(error) {
        console.error("Error writing in 'speed': ", error);
    });
});
