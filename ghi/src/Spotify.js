import React from 'react';

const Spotify = () => {
    const CLIENT_ID = "c7543eda9c9b4e4a8fd6bcdb7f7d7f41";
    const REDIRECT_URI = "http://localhost:3000/spotify";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const handleSpotifyLogin = () => {
        const queryParams = new URLSearchParams({
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: RESPONSE_TYPE,
        });
        const authUrl = `${AUTH_ENDPOINT}?${CLIENT_ID}?${queryParams.toString()}`;

        window.location.href = authUrl;
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify</h1>
                <button onClick={handleSpotifyLogin}>Login to Spotify</button>
            </header>
        </div>
    );
};

export default Spotify;
