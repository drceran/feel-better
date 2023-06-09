import React from 'react';

const Dropdown = (props) => {

    const dropdownChanged = (e) => {
        props.changed(e.target.value);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ marginRight: '10px' }}>{props.label}</label>
            <select
                value={props.selectedValue}
                onChange={dropdownChanged}
                style={{ padding: '5px' }}
            >
                <option key={0}>Select...</option>
                {props.options.map((item, idx) => (
                    <option key={idx + 1} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
