import { getDatabase, ref, set, push } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "suds-ify.firebaseapp.com",
  projectId: "suds-ify",
  storageBucket: "suds-ify.appspot.com",
  messagingSenderId: "594176423373",
  appId: "1:594176423373:web:28ae203794701b159f4084",
  measurementId: "G-YR2NJYV4H2",
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export function suggestSong(songData) {
  const DBref = ref(database, "suggestions/");
  const listPush = push(DBref);

  set(listPush, {
    songName: songData.name,
    songLink: songData.link,
  });
}
