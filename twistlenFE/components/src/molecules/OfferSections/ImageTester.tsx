import React, { useState } from "react";
import { Button, Image, View, StyleSheet, ActivityIndicator, Alert, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = "https://uidwckb9q8.execute-api.ap-south-1.amazonaws.com/Prod/update-profile";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczZjE4M2QxLTllNzMtNDJhNS04ZWU3LTEwOWViM2M5YzY1ZiIsImVtYWlsIjoicGluYWtpLnBhdHRhbmFpazExQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoicGF0dGFuYWlrMDk4IiwiaWF0IjoxNzQ1MjQ3NDM5LCJleHAiOjE3NDUyNDgzMzl9.1R2Us465-9-_HLpiyUseRZ1NwW6NBbWv1Y0VwDRZN1I"; // your token here

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImageAndUpload = async () => {
    try {
      setUploading(true);

      // Request permission to access media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission required", "Please allow access to media library.");
        return;
      }

      // Launch image picker
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (pickerResult.canceled || !pickerResult.assets?.[0]?.uri) {
        return;
      }

      const fileUri = pickerResult.assets[0].uri;
      const fileName = pickerResult.assets[0].fileName || `image_${Date.now()}.jpg`;
      const mimeType = pickerResult.assets[0].mimeType || 'image/jpeg';

      console.log("fileUri:", fileUri);
      console.log("fileName:", fileName);
      console.log("mimeType:", mimeType);

      setImageUri(fileUri);

      // Get pre-signed URL from your backend
      const presignRes = await axios.post(
        API_URL,
        { profilePicture: fileName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
          },
        }
      );

      const { uploadUrl } = presignRes.data;

      // Fetch blob from URI (this works on both Android and Web)
      const imageRes = await fetch(fileUri);
      const blob = await imageRes.blob();

      // Upload to S3
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: blob,
        headers: {
          'Content-Type': mimeType,
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      Alert.alert("Upload Successful", "Image uploaded to S3!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload Error", error.message || "Something went wrong.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick and Upload Image" onPress={pickImageAndUpload} />
      {uploading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
