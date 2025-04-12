import React, { useEffect, useState, useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Alert,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PageEditor from "./Page";
import axios from "axios";
import rootUrl from "./constants";
import usePageStore from "./Stores/PageStores";
import { router } from "expo-router";

const Admin = () => {
  const { setIsLoading, isLoading, setPages, pages } = usePageStore();
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [newPageName, setNewPageName] = useState("");

  const isFetching = isLoading?.type === "page" && isLoading?.status;
  const isAdding = isLoading?.type === "pageAdd" && isLoading?.status;

  // Fetch pages
  const fetchPages = useCallback(async () => {
    setIsLoading({ type: "page", status: true });
    try {
      const { data } = await axios.get(`${rootUrl}/Prod/pages`);
      setPages(data);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setIsLoading({ type: "page", status: false });
    }
  }, [setIsLoading, setPages]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  // Add page
  const addPage = useCallback(async () => {
    if (!newPageName.trim()) return alert("Please enter a page name.");
    setIsLoading({ type: "pageAdd", status: true });

    try {
      await axios.post(`${rootUrl}/Prod/pages`, {
        id: Date.now().toString(),
        name: newPageName.trim(),
      });
      setNewPageName("");
      fetchPages();
    } catch (error) {
      console.error("Error adding page:", error);
    } finally {
      setIsLoading({ type: "pageAdd", status: false });
    }
  }, [newPageName, fetchPages, setIsLoading]);

  const confirmDelete = (pageId) => {
    if (Platform.OS === "web") {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this page?"
      );
      if (isConfirmed) deletePage(pageId);
    } else {
      Alert.alert(
        "Confirm Delete",
        "Are you sure you want to delete this page?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => deletePage(pageId) },
        ]
      );
    }
  };

  const deletePage = useCallback(
    async (pageId) => {
      setIsLoading({ type: "pageDelete", status: true, id: pageId });
      try {
        await axios.delete(`${rootUrl}/Prod/pages?id=${pageId}`);
        fetchPages();
        alert("Page deleted successfully");
      } catch (error) {
        console.error("Error deleting page:", error);
      } finally {
        setIsLoading({ type: "pageDelete", status: false, id: pageId });
      }
    },
    [fetchPages, setIsLoading]
  );

  return (
    <View style={styles.container}>
      {selectedPageId === null ? (
        <>
          {/* Add Page Section */}
          <View style={styles.inputContainer}>
            <TextInput
              value={newPageName}
              onChangeText={setNewPageName}
              style={styles.input}
              placeholder="Enter page name"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              onPress={addPage}
              style={[styles.addButton, isAdding && styles.disabledButton]}
              disabled={isAdding}
            >
              {isAdding ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Add</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Pages List */}
          {isFetching ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <FlatList
              data={pages}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={styles.noPagesText}>No pages added yet.</Text>
              }
              renderItem={({ item }) => {
                const isDeleting =
                  isLoading?.type === "pageDelete" &&
                  isLoading?.id === item.id &&
                  isLoading?.status;
                return (
                  <View style={styles.pageItem}>
                    <TouchableOpacity
                      onPress={() => {
                        let routeName = item?.name
                          ?.replace(/\s+/g, "") // Remove spaces
                          ?.replace(/-/g, "_") // Replace hyphens with underscores
                          ?.toLowerCase();

                        if (routeName === "home") {
                          routeName = "auth"; // Change "home" to "auth"
                        }

                        router.push(`/(${routeName})`);
                      }}
                    >
                      <Text style={styles.pageText}>{item.name}</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        onPress={() => setSelectedPageId(item.id)}
                      >
                        <MaterialIcons name="edit" size={24} color="blue" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => confirmDelete(item.id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <ActivityIndicator size="small" color="red" />
                        ) : (
                          <MaterialIcons name="delete" size={24} color="red" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  noPagesText: { textAlign: "center", color: "#777", fontSize: 16 },
  pageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  pageText: { fontSize: 16, color: "#333" },
  buttonGroup: { flexDirection: "row", gap: 10 },
});

export default Admin;
