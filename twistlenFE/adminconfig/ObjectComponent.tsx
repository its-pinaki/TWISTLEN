import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { componentConfig} from "../components/libs/componentConfig"

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

  const handleTypeChange = (newType) => {
    setType(newType);
    setProperties({});
    onUpdate(object.id, { ...object, type: newType, properties: {} });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Component Type</Text>
      <Picker selectedValue={type} onValueChange={handleTypeChange} style={styles.picker}>
        {Object.keys(componentConfig).map((compType) => (
          <Picker.Item key={compType} label={compType} value={compType} />
        ))}
      </Picker>

      <Text style={styles.heading}>Properties</Text>
      {componentConfig[type]?.map(({ key, defaultValue }) => (
        <View key={key} style={styles.propertyContainer}>
          <Text>{key}:</Text>
          <TextInput
            style={styles.input}
            value={properties[key] !== undefined ? properties[key] : defaultValue}
            onChangeText={(value) => updateProperty(key, value)}
          />
        </View>
      ))}

      <Button title="Delete" color="red" onPress={() => onDelete(object.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  propertyContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
});

export default ObjectComponent;