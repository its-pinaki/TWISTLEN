import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";

interface TagInputProps {
  onTagsChange?: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    const key = event.nativeEvent.key;
    if (key === "," || key === "Enter") {
      addTag();
    }
  };

  const addTag = () => {
    const newTag = text.trim().replace(/,$/, "");
    if (newTag && !tags.includes(newTag)) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onTagsChange?.(updatedTags);
    }
    setText("");
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tagWrapper}>
        {tags.map((tag, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(index)}>
              <Text style={styles.remove}>×</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onKeyPress={handleKeyPress}
          onSubmitEditing={addTag}
          placeholder="Type and press comma or Enter"
          blurOnSubmit={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping in outer container
    alignItems: "center",
    minHeight: 50,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap tags and input to new lines
    alignItems: "center",
    flexGrow: 1,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#d0e8ff",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginVertical: 4,
  },
  tagText: {
    fontSize: 14,
    color: "#333",
  },
  remove: {
    marginLeft: 6,
    color: "#333",
    fontSize: 16,
  },
  input: {
    minWidth: 120,
    maxWidth: 200,
    padding: 6,
    fontSize: 14,
    flexGrow: 1,
  },
});

export default TagInput;
