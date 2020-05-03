import app from 'firebase/app';
import * as firebase from 'firebase';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_MEASUREMENT_ID,
};


export default class FirebaseService {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.ft = app.firestore();
    }

    onAuthStateChange(callback) {
      return this.auth.onAuthStateChanged(user => callback(user))
    };

    authenticateWithGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return new Promise((resolve, reject) => {
        this.auth.signInWithPopup(provider)
        .then( (result) => {
          resolve(result.user);
         })
         .catch( (error) => {
             console.log(error);
             reject(error);
        });
      });
     }

    onSignOut() {
      return new Promise((resolve, reject) => {
        this.auth.signOut()
        .then( () => {
          console.log("Successfully logged out");
          resolve();
         })
         .catch( (error) => {
             console.log(error);
             reject(error);
        });
      });
    }

    /**
     * Synchronously set (merge mode) document in collection referenced by obj._id
     * [Default primary key in firestore: _id]
     * @argument {string} collectionName - Name of the collection in firestore
     * @argument {*} obj - Any object with defined _id attribute
     * @returns {*} - true if set has been successful
     */
    setDocSync = async (collectionName, obj) => {
        const query = this.ft
            .collection(collectionName)
            .doc(obj._id);
        try {
            await query.set({ ...obj }, { merge: true });
            return true;
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    /**
     * Synchronously get document in collection referenced by obj._id
     * [Default primary key in firestore: _id]
     * @argument {string} collectionName - Name of the collection in firestore
     * @argument {*} obj - Any object with defined _id attribute
     * @returns {*} - Fetched object
     */
    getDocSync = async (collectionName, obj) => {
        const query = this.ft
            .collection(collectionName)
            .doc(obj._id);
        try {
            let fetchedObj = await query.get();
            if (fetchedObj.exists) {
                return fetchedObj.data();
            } else {
                const error = new Error(`Object not found in collection = ${collectionName}, obj._id = ${obj._id}`);
                throw error;
            }
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
