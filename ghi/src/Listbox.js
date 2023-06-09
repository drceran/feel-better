import React from 'react';

const Listbox = (props) => {
    const clicked = (e) => {
        e.preventDefault();
        props.clicked(e.target.id);
    };

    return (
        <div style={{ width: '50%' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {props.items.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={clicked}
                        style={{
                            border: '1px solid #ccc',
                            padding: '4px',
                            margin: '3px 0',
                            background: 'white',
                            borderRadius: '2px',
                            cursor: 'pointer',
                        }}
                        id={item.track.id}
                    >
                        {item.track.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Listbox;
