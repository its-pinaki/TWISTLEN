import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import ObjectComponent from "./ObjectComponent";
import { componentMapping } from "../components/libs/componentConfig";
import Draggable from "react-draggable";
import axios from "axios";
import rootUrl from "./constants";
import usePageStore from "./Stores/PageStores";

const PageEditor = ({ page, onUpdate, onClose }) => {
  const { setIsLoading, isLoading } = usePageStore();
  const [objects, setObjects] = useState(page.objects || []);
  const [expandedComponentId, setExpandedComponentId] = useState(null);

  useEffect(() => {
    onUpdate({ ...page, objects });
  }, [objects]);

  const addObject = () => {
    const newY = objects.length * 50;
    setObjects([
      ...objects,
      {
        id: Date.now(),
        type: Object.keys(componentMapping)[0],
        properties: {},
        position: { x: 0, y: newY },
      },
    ]);
  };

  const updateObject = (id, updatedObject) => {
    setObjects(objects.map((obj) => (obj.id === id ? updatedObject : obj)));
  };

  const deleteObject = (id) => {
    setObjects(objects.filter((obj) => obj.id !== id));
  };

  const handleDrag = (id, e, data) => {
    setObjects(
      objects.map((obj) =>
        obj.id === id ? { ...obj, position: { x: data.x, y: data.y } } : obj
      )
    );
  };

  const toggleExpand = (id) => {
    setExpandedComponentId(expandedComponentId === id ? null : id);
  };

  const onSave = async () => {
    setIsLoading({ type: "pageUpdate", status: true, id: page.id });
    try {
      await axios.post(
        `${rootUrl}/Prod/pages`,
        {
          id: page.id,
          objects,
          name: page.name,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      onClose();
    } catch (error) {
      console.error("Error saving page:", error);
    }
    setIsLoading({ type: "pageUpdate", status: false, id: page.id });
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
      {/* Left Panel: Object Controls */}
      <View style={{ flex: 1, padding: 10 }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Editing Page {page.name}
          </Text>

          {objects.length === 0 ? (
            <Text>No objects yet.</Text>
          ) : (
            objects.map((obj) => (
              <View key={obj.id} style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  onPress={() => toggleExpand(obj.id)}
                  style={{
                    backgroundColor:
                      expandedComponentId === obj.id ? "#d3d3d3" : "#e0e0e0",
                    padding: 10,
                    borderRadius: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Component Type: {obj.type}</Text>
                  <Text
                    style={{
                      transform: [
                        {
                          rotate:
                            expandedComponentId === obj.id ? "180deg" : "0deg",
                        },
                      ],
                    }}
                  >
                    ⬆️
                  </Text>
                </TouchableOpacity>

                {expandedComponentId === obj.id && (
                  <ScrollView
                    style={{ maxHeight: 300 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled
                  >
                    <ObjectComponent
                      object={obj}
                      onUpdate={updateObject}
                      onDelete={deleteObject}
                    />
                  </ScrollView>
                )}
              </View>
            ))
          )}

          {/* Action Buttons */}
          <TouchableOpacity
            onPress={addObject}
            style={{
              backgroundColor: "#f0ad4e",
              padding: 10,
              marginVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Add Object
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: "#5bc0de",
              padding: 10,
              marginVertical: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSave}
            style={{
              backgroundColor:
                isLoading?.status && isLoading?.type === "pageUpdate"
                  ? "#aaa"
                  : "#5cb85c",
              padding: 10,
              marginVertical: 5,
              borderRadius: 5,
            }}
            disabled={isLoading?.status && isLoading?.type === "pageUpdate"}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {isLoading?.status && isLoading?.type === "pageUpdate"
                ? "Saving..."
                : "Save"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Right Panel: Live Preview */}
      <View
        style={{
          flex: 2, // Takes more space for editing
          padding: 10,
          borderWidth: 1,
          borderColor: "#ddd",
          position: "relative",
        }}
      >
        <ScrollView>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
            Live Preview (Drag & Move Objects)
          </Text>

          {objects.map((obj) => {
            const Component = componentMapping[obj.type];
            return Component ? (
              <Draggable
                key={obj.id}
                defaultPosition={{ x: obj.position.x, y: obj.position.y }}
                onDrag={(e, data) => handleDrag(obj.id, e, data)}
              >
                <View style={{ position: "absolute" }}>
                  <Component {...obj.properties} />
                </View>
              </Draggable>
            ) : null;
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default PageEditor;
