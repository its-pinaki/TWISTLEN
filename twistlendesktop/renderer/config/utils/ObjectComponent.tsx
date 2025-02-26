import React, { useEffect, useState } from "react";
import { componentConfig } from "shared-components-library/shared-library/libs/componentConfig";

const ObjectComponent = ({ object, onUpdate, onDelete }) => {
  const [properties, setProperties] = useState(object.properties || {});
  const [type, setType] = useState(object.type);

  const updateProperty = (key, value) => {
    const updatedObject = {
      ...object,
      properties: {
        ...properties,
        [key]: value === "" ? "" : value, // Allow empty values
      },
    };

    setProperties(updatedObject.properties);
    onUpdate(object.id, updatedObject);
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    setProperties({});
    onUpdate(object.id, { ...object, type: newType, properties: {} });
  };

  return (
    <div
      style={{ padding: "10px", margin: "10px 0", border: "1px solid #aaa" }}
    >
      <h4>Component Type</h4>
      <select value={type} onChange={handleTypeChange}>
        {Object.keys(componentConfig).map((compType) => (
          <option key={compType} value={compType}>
            {compType}
          </option>
        ))}
      </select>

      <h4>Properties</h4>
      {componentConfig[type]?.map(({ key, defaultValue }) => (
        <div key={key} style={{ marginBottom: "5px" }}>
          <label>{key}:</label>
          <input
            type="text"
            value={
              properties[key] !== undefined ? properties[key] : defaultValue
            } // Keep empty string if cleared
            onChange={(e) => updateProperty(key, e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={() => onDelete(object.id)}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete
      </button>
    </div>
  );
};

export default ObjectComponent;
