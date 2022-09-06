import "./submit.scss";
import React, { useState } from "react";
import { Button } from "../../components/Button/Button";
import { TextInput } from "../../components/TextInput/TextInput";
import sudsman from "../../assets/sudsman.jpg";

const PageSubmit = () => {
  const [songData, setSongData] = useState({});
  const [clear, setClear] = useState(false);

  return (
    <div className="suggest-page">
      <div className="song-suggest">
        <img src={sudsman} className="sudsman-logo"></img>
        <h3>Suggest A Song</h3>
        <div className="full-width-input">
          <TextInput
            label="Song Name"
            placeholder={"You Make My Dreams (Come True)"}
            onChange={(value) => {
              songData["name"] = value;
            }}
            clearText={clear}
            setClearText={setClear}
          />
        </div>
        <div className="full-width-input">
          <TextInput
            label="Spotify Link"
            placeholder={"https://open.spotify.com/track/...."}
            onChange={(value) => {
              songData["link"] = value;
            }}
            clearText={clear}
            setClearText={setClear}
          />
        </div>

        <div className="suggest-song-button">
          <Button
            label="Suggest Song"
            style={{ margin: 0 }}
            onClick={async () => {
              //
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { PageSubmit };
