import React, { useEffect, useState } from "react";
import PageEditor from "./Page";
import axios from "axios";
import { rootUrl } from "./constants";
import { usePageStore } from "./Stores/PageStores";

const Admin = () => {
  const { setIsLoading, isLoading, setPages, pages } = usePageStore();
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [newPageName, setNewPageName] = useState(""); // State for page name input

  const fetchPages = async () => {
    setIsLoading({ type: "page", status: true });
    try {
      const response = await axios.get(`${rootUrl}/Prod/pages`);
      setPages(response.data);
      setIsLoading({ type: "page", status: false });
    } catch (error) {
      console.error("Error fetching pages:", error);
      setIsLoading({ type: "page", status: false });
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handlePageNameChange = (e) => {
    setNewPageName(e.target.value);
  };

  const addPage = async () => {
    if (newPageName.trim() === "") {
      alert("Please enter a page name.");
      return;
    }
    setIsLoading({ type: "pageAdd", status: true });
    try {
      await axios.post(
        `${rootUrl}/Prod/pages`,
        JSON.stringify({
          id: Date.now().toString(),
          name: newPageName,
          // objects: [],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchPages();
      setIsLoading({ type: "pageAdd", status: false });
    } catch (error) {
      console.error("Error fetching pages:", error);
      setIsLoading({ type: "pageAdd", status: false });
    }
    // setPages([...pages, { id: Date.now(), name: newPageName, objects: [] }]);
    setNewPageName(""); // Clear the page name input after adding the page
  };

  const deletePage = async (pageId) => {
    setIsLoading({ type: "pageDelete", status: true, id: pageId });
    try {
      await axios.delete(`${rootUrl}/Prod/pages?id=${pageId}`);
      fetchPages();
      setIsLoading({ type: "pageDelete", status: false, id: pageId });
    } catch (error) {
      console.error("Error fetching pages:", error);
      setIsLoading({ type: "pageDelete", status: false, id: pageId });
    }
    // setPages(pages.filter((page) => page.id !== pageId));
    // if (selectedPageId === pageId) setSelectedPageId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      {selectedPageId === null ? (
        <>
          <div className="input-group mb-3">
            <input
              type="text"
              value={newPageName}
              onChange={handlePageNameChange}
              className="form-control"
              placeholder="Enter page name"
            />
            <button
              onClick={addPage}
              className="btn btn-success"
              disabled={
                isLoading?.type === "pageAdd" && isLoading?.status === true
              }
            >
              {isLoading?.type === "pageAdd" && isLoading?.status === true ? (
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Add Page"
              )}
            </button>
          </div>
          {isLoading?.type === "page" && isLoading?.status === true ? (
            <div
              className="spinner-grow text-warning text-center"
              role="status"
            >
              <span className="sr-only"></span>
            </div>
          ) : (
            <div>
              <h2 className="my-4">Page List</h2>
              {pages.length === 0 ? (
                <p className="text-muted">No pages added yet.</p>
              ) : (
                <ul className="list-group">
                  {pages.map((page) => (
                    <li
                      key={page.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{page.name}</span>
                      <div>
                        <button
                          onClick={() => setSelectedPageId(page.id)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deletePage(page.id)}
                          className="btn btn-danger btn-sm"
                          disabled={
                            isLoading?.type === "pageDelete" &&
                            isLoading?.id === page.id &&
                            isLoading?.status === true
                          }
                        >
                          {isLoading?.type === "pageDelete" &&
                          isLoading?.id === page.id &&
                          isLoading?.status === true ? (
                            <span
                              className="spinner-grow spinner-grow-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
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
