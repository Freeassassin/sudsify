import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Button } from "../../components/Button/Button";

// function getSuggestions() {
//   //   let suggestions = [];
//   // return suggestions;
// }

// function approveSong(songData) {
//   set(ref(database, "suggestions/" + songData.name), {
//     songName: songData.name,
//     songLink: songData.link,
//   });
// }

// function denySong(songData) {
//   set(ref(database, "suggestions/" + songData.name), {
//     songName: songData.name,
//     songLink: songData.link,
//   });
// }

const PageApprove = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBo6gxWS1zmh6G6G1raBdAf2W6psmPgDig",
    authDomain: "suds-ify.firebaseapp.com",
    projectId: "suds-ify",
    storageBucket: "suds-ify.appspot.com",
    messagingSenderId: "594176423373",
    appId: "1:594176423373:web:28ae203794701b159f4084",
    measurementId: "G-YR2NJYV4H2",
    databaseURL: "https://suds-ify-default-rtdb.firebaseio.com/",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  const suggestionsRef = ref(database, "/suggestions");

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    onValue(suggestionsRef, (snapshot) => {
      setSuggestions(Object.values(snapshot.val()));
    });
  });
  return (
    <div className="approve-page">
      <div className="song-list">
        <ul style={{ "background-color": "white" }}>
          {suggestions.map((songdata, index) => {
            return (
              <li style={{ "list-style": "none" }} key={index}>
                <h3>{songdata.songName}</h3>
                <Button
                  label="Approve"
                  style={{ margin: 0 }}
                  onClick={() => {
                    //
                  }}
                />
                <Button
                  label="Deny"
                  style={{ margin: 0 }}
                  onClick={() => {
                    //
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { PageApprove };
