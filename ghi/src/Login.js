import React from "react";

const CLIENT_ID = "c7543eda9c9b4e4a8fd6bcdb7f7d7f41";
const REDIRECT_URI = "http://localhost:3000/spotify";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const AUTH_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;

export default function Login() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <a
                style={{
                    display: "inline-block",
                    padding: "1rem 2rem",
                    background: "green",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "4px",
                    fontSize: "1.5rem",
                }}
                href={AUTH_URL}
            >
                Login With Spotify
            </a>
        </div>
    );
}
