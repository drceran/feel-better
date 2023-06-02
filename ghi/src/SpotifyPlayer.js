import React, { useEffect, useState } from "react";
import { Spotify } from "./Spotify";

function SpotifyPlayer() {
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
        <div className="container">
            <div className="main-wrapper">
                {/* Rest of your component code */}
            </div>
        </div>
    );
}

export default SpotifyPlayer;
