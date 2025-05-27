import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface CommentInputProps {
  onSubmit: (text: string) => void;
  placeholder?: string;
  inputProps?: TextInputProps;
  autoFocus?: boolean;
  onBlur?: () => void;
}
const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  placeholder = 'Add a comment...',
  inputProps,
  autoFocus = false,
  onBlur
}) => {
  const [text, setText] = useState('');
  const inputRef = React.useRef<TextInput>(null);
 
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
 
  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };
 
  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        multiline
        placeholderTextColor="#999"
        onBlur={onBlur}
        {...inputProps}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={!text.trim()}
      >
        <MaterialIcons
          name="send"
          size={24}
          color={text.trim() ? "#2196F3" : "#ccc"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 10,
    fontSize: 14,
  },
  submitButton: {
    padding: 8,
  },
});

export default CommentInput;