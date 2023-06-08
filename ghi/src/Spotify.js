import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Listbox from './Listbox';
import { Credentials } from './Credentials';
import axios from 'axios';
import SpotifyPlayer from 'react-spotify-player';

const Spotify = () => {
    const spotify = Credentials();
    const CLIENT_ID = "c7543eda9c9b4e4a8fd6bcdb7f7d7f41";
    const REDIRECT_URI = "http://localhost:3000/spotify";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";


    const [token, setToken] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
    const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
    const [trackDetail, setTrackDetail] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setToken(accessToken);
            setLoggedIn(true);
        }
    }, []);

    const authenticate = () => {
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${RESPONSE_TYPE}`;
    };

    useEffect(() => {
        if (window.location.hash) {
            const params = window.location.hash.substring(1).split('&');
            const accessToken = params.find(param => param.includes('access_token='));
            if (accessToken) {
                setToken(accessToken.split('=')[1]);
                setLoggedIn(true);
                localStorage.setItem('accessToken', accessToken.split('=')[1]);
            }
        }
    }, []);

    useEffect(() => {
        if (token) {
            axios(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(genreResponse => {
                    setGenres({
                        selectedGenre: genres.selectedGenre,
                        listOfGenresFromAPI: genreResponse.data.categories.items
                    });
                });
        }
    }, [token]);

    const genreChanged = val => {
        setGenres({
            selectedGenre: val,
            listOfGenresFromAPI: genres.listOfGenresFromAPI
        });

        axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(playlistResponse => {
                setPlaylist({
                    selectedPlaylist: playlist.selectedPlaylist,
                    listOfPlaylistFromAPI: playlistResponse.data.playlists.items
                });
            });
    };

    const playlistChanged = val => {
        setPlaylist({
            selectedPlaylist: val,
            listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        });
    };

    const buttonClicked = e => {
        e.preventDefault();

        axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(tracksResponse => {
                setTracks({
                    selectedTrack: tracks.selectedTrack,
                    listOfTracksFromAPI: tracksResponse.data.items
                });
            });
    };

    const listboxClicked = val => {
        const currentTracks = [...tracks.listOfTracksFromAPI];
        const trackInfo = currentTracks.filter(t => t.track.id === val);
        setTrackDetail(trackInfo[0].track);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken('');
        setLoggedIn(false);
    };

    const renderLoginView = () => {
        return (
            <div className="container">
                <button onClick={authenticate}>Log in with Spotify</button>
            </div>
        );
    };

    const renderMainView = () => {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={buttonClicked}>
                            <Dropdown label="Genre :" options={genres.listOfGenresFromAPI} selectedValue={genres.selectedGenre} changed={genreChanged} />
                            <Dropdown label="Playlist :" options={playlist.listOfPlaylistFromAPI} selectedValue={playlist.selectedPlaylist} changed={playlistChanged} />
                            <div className="col-sm-6 row form-group px-0">
                                <button type='submit' className="btn btn-success col-sm-12">
                                    Search
                                </button>
                            </div>
                        </form>
                        <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
                    </div>
                    {trackDetail && (
                        <div className="col-md-6">
                            <SpotifyPlayer
                                uri={trackDetail.uri}
                                size="large"
                                view="coverart"
                                theme="black"
                            />
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>
        );
    };

    return loggedIn ? renderMainView() : renderLoginView();
};

export default Spotify;
