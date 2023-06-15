import React from 'react';

const Dropdown = (props) => {
  const dropdownChanged = (e) => {
    props.changed(e.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ marginRight: '4px' }}>{props.label}</label>
      <select value={props.selectedValue} onChange={dropdownChanged} style={{ marginRight: "16px", padding: '25px' }}>
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
