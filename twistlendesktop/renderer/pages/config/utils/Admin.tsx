import React, { useState } from "react";
import PageEditor from "./Page";

const Admin = () => {
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [newPageName, setNewPageName] = useState(""); // State for page name input

  const handlePageNameChange = (e) => {
    setNewPageName(e.target.value);
  };

  const addPage = () => {
    if (newPageName.trim() === "") {
      alert("Please enter a page name.");
      return;
    }
    setPages([...pages, { id: Date.now(), name: newPageName, objects: [] }]);
    setNewPageName(""); // Clear the page name input after adding the page
  };

  const deletePage = (pageId) => {
    setPages(pages.filter((page) => page.id !== pageId));
    if (selectedPageId === pageId) setSelectedPageId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {selectedPageId === null ? (
        <>
          <input
            type="text"
            value={newPageName}
            onChange={handlePageNameChange}
            placeholder="Enter page name"
            style={{
              padding: "10px",
              marginBottom: "20px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          <button
            onClick={addPage}
            style={{
              padding: "10px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            Add New Page
          </button>
          <h2>Page List</h2>
          {pages.length === 0 ? (
            <p>No pages added yet.</p>
          ) : (
            <ul>
              {pages.map((page) => (
                <li key={page.id} style={{ marginBottom: "10px" }}>
                  <button onClick={() => setSelectedPageId(page.id)}>
                    Edit Page: {page.name}
                  </button>
                  <button
                    onClick={() => deletePage(page.id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <PageEditor
          page={pages.find((p) => p.id === selectedPageId)}
          onUpdate={(updatedPage) =>
            setPages(
              pages.map((p) => (p.id === selectedPageId ? updatedPage : p))
            )
          }
          onClose={() => setSelectedPageId(null)}
        />
      )}
    </div>
  );
};

export default Admin;
