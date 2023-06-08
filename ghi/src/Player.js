import React from 'react';

const Player = ({ track }) => {
    const { name, artists, album, preview_url } = track;

    return (
        <div className="player">
            <h3>{name}</h3>
            <p>Artists: {artists.map(artist => artist.name).join(', ')}</p>
            <p>Album: {album.name}</p>
            <audio controls>
                <source src={preview_url} type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default Player;
