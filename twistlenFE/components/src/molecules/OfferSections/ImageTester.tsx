import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL =
  "https://fxosysucf1.execute-api.ap-south-1.amazonaws.com/Prod/add-survey";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InNqZml1c2RjdWkiLCJmdWxsTmFtZSI6Ikdyb3djenMiLCJwb3NpdGlvbiI6Ik1hbmFnZXIiLCJkZXBhcnRtZW50IjoiSVQiLCJtdXN0Q2hhbmdlUGFzc3dvcmQiOnRydWUsImlhdCI6MTc0OTEwMTc4NywiZXhwIjoxNzQ5MTAzNTg3fQ.OHokoCNEUfdJfGQGyfVAt_1JarFoynDASclgrwljgkc"; // your token here

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImageAndUpload = async () => {
    try {
      setUploading(true);

      // Request permission to access media library
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to media library."
        );
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
      const fileName =
        pickerResult.assets[0].fileName || `image_${Date.now()}.jpg`;
      const mimeType = pickerResult.assets[0].mimeType || "image/jpeg";

      console.log("fileUri:", fileUri);
      console.log("fileName:", fileName);
      console.log("mimeType:", mimeType);

      setImageUri(fileUri);

      // Get pre-signed URL from your backend
      const presignRes = await axios.post(
        API_URL,
        { visitingCardFileName: fileName, employeeId: "sjfiusdcui" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: TOKEN,
          },
        }
      );

      const { visitingCardUploadUrl } = presignRes.data;

      // Fetch blob from URI (this works on both Android and Web)
      const imageRes = await fetch(fileUri);
      const blob = await imageRes.blob();

      // Upload to S3
      const response = await fetch(visitingCardUploadUrl, {
        method: "PUT",
        body: blob,
        headers: {
          "Content-Type": mimeType,
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
      {uploading && (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      )}
      {/* {imageUri && ( */}
        <Image
          source={{
            uri: "https://cpsinternal-storage-bucket.s3.ap-south-1.amazonaws.com/visiting_cards/7321ab81-cd56-4967-a4b4-e0a9689347e3-1749104215671-Screenshot%20%2816%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA5V6I6YEREMRSEH4O%2F20250605%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20250605T062302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGYaCmFwLXNvdXRoLTEiSDBGAiEAmsYTMS9P6Ss8hcmP9M5pa0FphtDyd66S%2F0u4YMkK9MQCIQDYj2%2Bh4I1GG1Ew89ieL%2B3YWAxyWbbd8CJhsSgRCbERGSqoAwg%2FEAAaDDk0MDQ4MjQxMjgzNCIMrHxJcAgmSUnkw4NnKoUDEdJwvsimh3D7Bf%2BFrF62%2BmoeAj%2FlDYOXMF71M2CK1lvr2pBd%2BL3COlQ7myxlaGNBxKIdcnDTMV%2BrNlilKpqggY1wHN78RBgNJkOHkGgE0jXJof51IVyBfq9NC4AQKbqWHFSJxgk79QtxtFqNJXgslW8e7bp5Aht7gBAmNjWp8bptZTmaEdxTVjd80HsLAq8Sh0Aly3SnUBbbMy85UnMp3HcBhbDdawVw0ypULmXP3BMJy3hu9dPJqscEeSicI4Jfc77TwMawLm8qc9PHoB0ePNG%2FaOhCVHz0321de5c%2FZK%2BiD7MI3ig6uF7C4J4NonFWG8ez4nUFUQgf%2FUwfIKZNdAYwFiXsQ1AyxL78vJnXOrsW32PJ3s8LEt91B%2Boin86pBXvcwXUCZAMlNbg3sKD%2BUCI3%2BOBsIV76C2VqXjAXPYmW6dAkVA%2FWMKOsXkSkB2Hxr8pNxMuII6M4m9hk%2F499kgq9iCgokMsls3ibayoXt6lK7wrdbwKv%2BcGcDuxWQBhsYMrEFUow1uyEwgY6nAEdK%2F27NHbupkGKuCCZg3524Rzh77uPhO1J3sa7NKQBvoPagf%2FpB9QGtoyYk8HtDpipYFy5yMCt47VA5zaeamvmWvG7oP6zEgSAjuX9tGeevEfP1%2F31Lay27SORhDOGiyK%2FEhDGNu2%2Blbtpzi4aM9h%2FYc8KKxOF3HIpfMNu%2F28gby%2BMFQJWA1KFtdjxofXn%2BpAjFahBjibg%2FgIXhgI%3D&X-Amz-Signature=841c85c0455d79c6b718b000f1e7a6f3d04db0744c41927b2ccec3011e5dab3d&X-Amz-SignedHeaders=host&response-content-disposition=inline",
          }}
          style={styles.imagePreview}
        />
      {/* )} */}
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
    resizeMode: "cover",
  },
});
