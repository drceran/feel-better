import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Player';
import { Credentials } from './Credentials';

const Spotify = () => {
    const spotify = Credentials();

    const [token, setToken] = useState('');
    const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
    const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
    const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
    const [trackDetail, setTrackDetail] = useState(null);

    useEffect(() => {
        axios('https://accounts.spotify.com/api/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
            },
            data: 'grant_type=client_credentials',
            method: 'POST'
        })
            .then(tokenResponse => {
                setToken(tokenResponse.data.access_token);

                axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
                })
                    .then(genreResponse => {
                        setGenres({
                            selectedGenre: genres.selectedGenre,
                            listOfGenresFromAPI: genreResponse.data.categories.items
                        });
                    });

            });

    }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]);

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

    return (
        <div className="container">
            <form onSubmit={buttonClicked}>
                <div className="col-sm-6 form-group row px-0">
                    <label className="form-label col-sm-2">Genre :</label>
                    <select
                        value={genres.selectedGenre}
                        onChange={(e) => genreChanged(e.target.value)}
                        className="form-control form-control-sm col-sm-10"
                    >
                        <option>Select...</option>
                        {genres.listOfGenresFromAPI.map((item, idx) => (
                            <option key={idx + 1} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-sm-6 form-group row px-0">
                    <label className="form-label col-sm-2">Playlist :</label>
                    <select
                        value={playlist.selectedPlaylist}
                        onChange={(e) => playlistChanged(e.target.value)}
                        className="form-control form-control-sm col-sm-10"
                    >
                        <option>Select...</option>
                        {playlist.listOfPlaylistFromAPI.map((item, idx) => (
                            <option key={idx + 1} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-sm-6 row form-group px-0">
                    <button type="submit" className="btn btn-success col-sm-12">
                        Search
                    </button>
                </div>
            </form>

            <div className="row">
                <div className="col-sm-6 px-0">
                    <div className="list-group">
                        {tracks.listOfTracksFromAPI.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => listboxClicked(item.track.id)}
                                className="list-group-item list-group-item-action list-group-item-light"
                            >
                                {item.track.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="col-sm-6">
                    {trackDetail && <Player track={trackDetail} />}
                </div>
            </div>
        </div>
    );
};

export default Spotify;
