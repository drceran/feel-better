import React from 'react';

const Detail = ({ album, artists, name }) => {

    return (
        <div style={{ marginLeft: '20px', width: 'calc(33.33% - 20px)' }}>
            <div style={{ width: '100%' }}>
                <img
                    src={album.images[0].url}
                    alt={name}
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ width: '100%' }}>
                <label htmlFor={name} style={{ width: '100%' }}>
                    {name}
                </label>
            </div>
            <div style={{ width: '100%' }}>
                <label htmlFor={artists[0].name} style={{ width: '100%' }}>
                    {artists[0].name}
                </label>
            </div>
        </div>
    );
}

export default Detail;
