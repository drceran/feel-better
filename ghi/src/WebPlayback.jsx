import React, { useState, useEffect } from "react";

function WebPlayback(props) {
  const [token, setToken] = useState("");

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: "Journal Jotters",
        getOAuthToken: (callback) => {
          callback(token);
        },
      });

      player.connect();
    };
  }, [token]);

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
        </div>
      </div>
    </>
  );
}

export default WebPlayback;
