import React, { useState, useEffect } from "react";
import ObjectComponent from "./ObjectComponent";
import { componentMapping } from "../../shared-library/shared-library/libs/componentConfig";
import Draggable from "react-draggable";

const PageEditor = ({ page, onUpdate, onClose }) => {
  const [objects, setObjects] = useState(page.objects || []);
  const [expandedComponentId, setExpandedComponentId] = useState(null); // State to track which component is expanded

  useEffect(() => {
    onUpdate({ ...page, objects });
  }, [objects]);

  const addObject = () => {
    const newY = objects.length * 50;  // Adjust 100 based on the height you want between objects
    setObjects([...objects, { id: Date.now(), type: "button", properties: {}, position: { x: 0, y: newY } }]);
  };

  const updateObject = (id, updatedObject) => {
    setObjects(objects.map((obj) => (obj.id === id ? updatedObject : obj)));
  };

  const deleteObject = (id) => {
    setObjects(objects.filter((obj) => obj.id !== id));
  };

  const handleDrag = (id, e, data) => {
    const updatedObjects = objects.map((obj) =>
      obj.id === id ? { ...obj, position: { x: data.x, y: data.y } } : obj
    );

    const sortedObjects = [...updatedObjects].sort((a, b) => {
      if (a.position.y === b.position.y) {
        return a.position.x - b.position.x;
      }
      return a.position.y - b.position.y;
    });

    setObjects(sortedObjects);
  };

  const toggleExpand = (id) => {
    setExpandedComponentId(expandedComponentId === id ? null : id); // Toggle expand/collapse state
  };

  console.log("objects", objects);

  return (
    <div style={{ display: "flex", gap: "20px", height: "100vh" }}>
      {/* Left: Object Controls */}
      <div style={{ flex: 1, maxHeight: "100vh", overflowY: "auto" }}>
        <h2>Editing Page {page.id}</h2>
        {objects.length === 0 ? (
          <p>No objects yet.</p>
        ) : (
          objects.map((obj) => (
            <div key={obj.id}>
              {/* Show the Component Type section in collapsed or expanded state */}
              <div>
                <button
                  onClick={() => toggleExpand(obj.id)}
                  style={{
                    backgroundColor: expandedComponentId === obj.id ? "#d3d3d3" : "#e0e0e0",
                    padding: "10px",
                    marginBottom: "10px",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  Component Type: {obj.type}
                  {/* Up/Down Icon */}
                  <span style={{ transform: expandedComponentId === obj.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
                    ⬆️
                  </span>
                </button>
                {expandedComponentId === obj.id && (
                  <ObjectComponent
                    object={obj}
                    onUpdate={updateObject}
                    onDelete={deleteObject}
                  />
                )}
              </div>
            </div>
          ))
        )}
        <button
          onClick={addObject}
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "5px 10px",
            marginRight: "10px",
          }}
        >
          Add Object
        </button>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "gray",
            color: "white",
            padding: "5px 10px",
          }}
        >
          Back
        </button>
      </div>

      {/* ✅ PREVIEW SECTION WITH DRAGGABLE COMPONENTS */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ddd",
          minHeight: "300px",
          position: "relative",
          overflowY: "auto", // Make the preview section scrollable
          height: "100vh",  // Ensure it takes up full height
        }}
      >
        <h3>Live Preview (Drag & Move Objects)</h3>
        {objects.map((obj) => {
          const Component = componentMapping[obj.type];
          return Component ? (
            <Draggable
              key={obj.id}
              position={obj.position}
              bounds="parent"
              onStop={(e, data) => handleDrag(obj.id, e, data)}
            >
              <div style={{ position: "absolute", cursor: "move" }} onClick={() => toggleExpand(obj.id)}>
                <Component {...obj.properties} />
              </div>
            </Draggable>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default PageEditor;
