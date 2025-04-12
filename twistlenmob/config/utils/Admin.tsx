import React, { useEffect, useState } from "react";
import PageEditor from "./Page";
import axios from "axios";
import rootUrl from "./constants";
import usePageStore from "./Stores/PageStores";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

const Admin = () => {
  const { setIsLoading, isLoading, setPages, pages } = usePageStore();
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [newPageName, setNewPageName] = useState("");

  const fetchPages = async () => {
    setIsLoading({ type: "page", status: true });
    try {
      const response = await axios.get(`${rootUrl}/Prod/pages`);
      setPages(response.data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setIsLoading({ type: "page", status: false });
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const addPage = async () => {
    if (newPageName.trim() === "") {
      alert("Please enter a page name.");
      return;
    }
    setIsLoading({ type: "pageAdd", status: true });
    try {
      await axios.post(
        `${rootUrl}/Prod/pages`,
        {
          id: Date.now().toString(),
          name: newPageName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchPages();
    } catch (error) {
      console.error("Error adding page:", error);
    } finally {
      setIsLoading({ type: "pageAdd", status: false });
      setNewPageName("");
    }
  };

  const deletePage = async (pageId) => {
    setIsLoading({ type: "pageDelete", status: true, id: pageId });
    try {
      await axios.delete(`${rootUrl}/Prod/pages?id=${pageId}`);
      fetchPages();
    } catch (error) {
      console.error("Error deleting page:", error);
    } finally {
      setIsLoading({ type: "pageDelete", status: false, id: pageId });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {selectedPageId === null ? (
        <>
          {/* Input and Add Button */}
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <TextInput
              value={newPageName}
              onChangeText={setNewPageName}
              style={{
                flex: 1,
                borderColor: "#ccc",
                borderWidth: 1,
                padding: 10,
                marginRight: 10,
              }}
              placeholder="Enter page name"
            />
            <TouchableOpacity
              onPress={addPage}
              style={{
                backgroundColor: "green",
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={isLoading?.type === "pageAdd" && isLoading?.status}
            >
              {isLoading?.type === "pageAdd" && isLoading?.status ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={{ color: "#fff" }}>Add Page</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Page List */}
          {isLoading?.type === "page" && isLoading?.status ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <View>
              <Text style={{ fontSize: 24, marginBottom: 20 }}>Page List</Text>
              {pages.length === 0 ? (
                <Text style={{ color: "#888" }}>No pages added yet.</Text>
              ) : (
                <FlatList
                  data={pages}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: "#ccc",
                      }}
                    >
                      <Text>{item.name}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={() => setSelectedPageId(item.id)}
                          style={{
                            borderColor: "blue",
                            borderWidth: 1,
                            padding: 5,
                            marginRight: 10,
                          }}
                        >
                          <Text style={{ color: "blue" }}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => deletePage(item.id)}
                          style={{
                            backgroundColor: "red",
                            padding: 5,
                          }}
                          disabled={
                            isLoading?.type === "pageDelete" &&
                            isLoading?.id === item.id &&
                            isLoading?.status
                          }
                        >
                          {isLoading?.type === "pageDelete" &&
                          isLoading?.id === item.id &&
                          isLoading?.status ? (
                            <ActivityIndicator size="small" color="#fff" />
                          ) : (
                            <Text style={{ color: "#fff" }}>Delete</Text>
                          )}
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
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
    </View>
  );
};

export default Admin;
