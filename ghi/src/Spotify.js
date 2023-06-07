import React, { useEffect, useState } from "react";
import axios from "axios";
import Player from "./Player";


function Spotify() {
    const CLIENT_ID = "c7543eda9c9b4e4a8fd6bcdb7f7d7f41";
    const REDIRECT_URI = "http://localhost:3000/spotify";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();

    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: "Journal Jotters",
            getOAuthToken: (callback) => {
                callback(token);
            },
        });

        player.connect();
    };

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearchKey("");
    }

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
        setToken(token);
    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };

    const searchArtists = async (e) => {
        e.preventDefault();
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: searchKey,
                type: "artist",
            },
        });
        setArtists(data.artists.items);
    };

    const renderArtists = () => {
        return artists.map((artist) => (
            <div key={artist.id}>
                {artist.images.length ? (
                    <img width={"40%"} src={artist.images[0].url} alt="" />
                ) : (
                    <div>No Image</div>
                )}
                {artist.name}
            </div>
        ));
    };



    return (
         <div className="App">
            <header className="App-header">
                <h1>Spotify</h1>
                <script src="https://sdk.scdn.co/spotify-player.js"></script>
                {!token ? (
                    <a
                        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
                    >
                        Login to Spotify
                    </a>
                ) : (
                    <button onClick={logout}>Logout</button>
                )}

                {token ? (
                    <form onSubmit={searchArtists}>
                        <input
                            type="text"
                            onChange={(e) => setSearchKey(e.target.value)}
                            style={{ color: "black" }}
                        />
                        <button type="submit">Search</button>
                    </form>
                ) : (
                    <h2>Welcome</h2>
                )}

                {renderArtists()}
                <div>
                    <Player token={token} trackUri ={""} />
                </div>
            </header>
        </div>
    );

}


export default Spotify;
