
function Spotify() {
    const CLIENT_ID = "c7543eda9c9b4e4a8fd6bcdb7f7d7f41";
    const REDIRECT_URI = "http://localhost:3000/spotify";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    return (
        <div className="App">
            <header className="App-header">
                <h1>Spotify</h1>
                <a href={'${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}'}>Login to Spotify</a>
            </header>
        </div>
    )
}

    export default Spotify;
