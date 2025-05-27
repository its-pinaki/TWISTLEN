import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { IconButton } from "react-native-paper";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const ProductMediaForm = ({ initialData = {}, onSubmit, onBack }) => {
  // Form state
  const [formData, setFormData] = useState({
    images: [],
    thumbnail: "",
    video_url: "",
    gallery_description: "",
    ...initialData,
  });

  // Handle image selection (mock function - replace with actual image picker)
  const handleImageSelect = () => {
    // In a real app, this would use an image picker library
    // For demo, we'll just add a placeholder URL
    const newImage = `https://picsum.photos/300/200?random=${Math.random()}`;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages,
        // If removed image was the thumbnail, clear thumbnail
        thumbnail: prev.thumbnail === prev.images[index] ? "" : prev.thumbnail,
      };
    });
  };

  // Set thumbnail
  const handleSetThumbnail = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: imageUrl,
    }));
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Images Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Images</Text>
        <Text style={styles.helperText}>
          Upload high-quality product images (max 10)
        </Text>

        <View style={styles.imagesContainer}>
          {formData.images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.image} />
              <View style={styles.imageActions}>
                <IconButton
                  icon={formData.thumbnail === image ? "star" : "star-outline"}
                  size={20}
                  color={formData.thumbnail === image ? "#FFD700" : "#666"}
                  onPress={() => handleSetThumbnail(image)}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  color="#ff4444"
                  onPress={() => handleRemoveImage(index)}
                />
              </View>
              {formData.thumbnail === image && (
                <Text style={styles.thumbnailLabel}>Thumbnail</Text>
              )}
            </View>
          ))}

          {formData.images.length < 10 && (
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={handleImageSelect}
            >
              <Text style={styles.addImageText}>+ Add Image</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Video URL */}
      <View style={styles.section}>
        <Input
          label="Video URL (Optional)"
          value={formData.video_url}
          onChangeText={(text) => handleChange("video_url", text)}
          placeholder="https://example.com/video.mp4"
          leftIcon="video"
          helperText="Link to product video (YouTube, Vimeo, etc.)"
        />
      </View>

      {/* Gallery Description */}
      <View style={styles.section}>
        <Input
          label="Gallery Description (Optional)"
          value={formData.gallery_description}
          onChangeText={(text) => handleChange("gallery_description", text)}
          placeholder="Describe your product gallery"
          multiline
          numberOfLines={3}
          inputStyle={{ height: 80 }}
          helperText="Description for your product image gallery"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Back Button */}
        <Button
          title="Back"
          onPress={onBack}
          mode="contained"
          style={{ marginTop: 20 }}
        />
        {/* Submit Button */}
        <Button
          title="Save Media"
          onPress={handleSubmit}
          mode="contained"
          style={{ marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  contentContainer: {
    paddingBottom: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  imageWrapper: {
    width: "48%",
    marginBottom: 10,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  imageActions: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  thumbnailLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 215, 0, 0.7)",
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 2,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  addImageButton: {
    width: "48%",
    height: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addImageText: {
    color: "#666",
  },
});

export default ProductMediaForm;
