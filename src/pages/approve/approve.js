import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref, remove } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Button } from "../../components/Button/Button";
import axios from "axios";

const PageApprove = () => {
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
  const suggestionsRef = ref(database, "/suggestions");

  const [suggestions, setSuggestions] = useState([]);

  const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/approve";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const denySong = async (songdata) => {
    console.log(songdata);
    const songRef = ref(database, "suggestions/" + songdata.id);
    remove(songRef);
  };
  const approveSong = async (songdata) => {
    console.log(songdata);
    const songURL = new URL(songdata.songLink);
    console.log(("spotify" + songURL.pathname).replace(/\//g, ":"));
    const songRef = ref(database, "suggestions/" + songdata.id);
    const { data } = await axios.post(
      "https://api.spotify.com/v1/me/player/queue",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        params: {
          uri: ("spotify" + songURL.pathname).replace(/\//g, ":"),
        },
      }
    );
    remove(songRef);
  };

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    console.log(token);
    setToken(token);
  }, []);

  useEffect(() => {
    onValue(suggestionsRef, (snapshot) => {
      setSuggestions(
        Object.values(snapshot.val()).map((data, index) => {
          data.id = Object.keys(snapshot.val())[index];
          return data;
        })
      );
    });
  }, []);
  return (
    <div className="approve-page">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-modify-playback-state`}
        >
          Login to Spotify
        </a>
      ) : (
        <Button label={"Logout"} onClick={logout}>
          Logout
        </Button>
      )}
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
                    approveSong(songdata);
                  }}
                />
                <Button
                  label="Deny"
                  style={{ margin: 0 }}
                  onClick={() => {
                    denySong(songdata);
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
