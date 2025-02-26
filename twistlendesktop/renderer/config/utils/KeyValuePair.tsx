import React from 'react';

const KeyValuePair = ({ keyVal, onValueChange, index }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <input
        type="text"
        value={keyVal.key}
        readOnly
        style={{
          padding: '5px',
          marginRight: '5px',
          width: '120px',
          backgroundColor: '#f0f0f0',
        }}
      />
      <input
        type="text"
        placeholder="Value"
        value={keyVal.value}
        onChange={(e) => onValueChange(index, e.target.value)}
        style={{
          padding: '5px',
          width: '200px',
        }}
      />
    </div>
  );
};

export default KeyValuePair;
