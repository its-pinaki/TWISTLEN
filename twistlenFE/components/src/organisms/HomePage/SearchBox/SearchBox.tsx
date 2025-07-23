import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const popularSuggestions = [
  "Smart watch under ₹3K",
  "Budget laptop",
  "Eco-friendly products",
  "Wireless earbuds",
  "Fitness tracker",
  "Gaming mouse",
];

const screenWidth = Dimensions.get("window").width;
const isMobile = screenWidth < 600;

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [focusedInput, setFocusedInput] = useState("");

  const handleSearch = () => {
    console.log("Search Query:", query);
    console.log("Budget:", budget);
    console.log("Purpose:", purpose);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setQuery(suggestion);
  };

  const getInputStyle = (inputName: string) => [
    styles.input,
    focusedInput === inputName && styles.inputFocused,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.card}>
        {/* Main Search Input */}
        <View style={styles.mainSearchContainer}>
          <TextInput
            placeholder="🔍 What are you looking for?"
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
            onFocus={() => setFocusedInput("query")}
            onBlur={() => setFocusedInput("")}
            style={getInputStyle("query")}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          />
          {!isMobile && (
            <TouchableOpacity
              style={styles.button}
              onPress={handleSearch}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Find Matches</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Secondary Inputs Row */}
        <View
          style={{ $$css: true, _: "flex-col md:flex-row" }}
        >
          <TextInput
            placeholder="💰 Budget range (e.g., ₹1000-5000)"
            placeholderTextColor="#888"
            value={budget}
            onChangeText={setBudget}
            onFocus={() => setFocusedInput("budget")}
            onBlur={() => setFocusedInput("")}
            style={styles.subInput}
            keyboardType="numbers-and-punctuation"
          />

          <TextInput
            placeholder="🎯 Purpose (e.g., Gift, Office)"
            placeholderTextColor="#888"
            value={purpose}
            onChangeText={setPurpose}
            onFocus={() => setFocusedInput("purpose")}
            onBlur={() => setFocusedInput("")}
            style={styles.subInput}
          />
        </View>

        {/* Mobile Button */}
        {isMobile && (
          <TouchableOpacity
            style={[styles.button, styles.mobileButton]}
            onPress={handleSearch}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Search Products</Text>
          </TouchableOpacity>
        )}

        {/* Popular Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsScroll}
          >
            {popularSuggestions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tag}
                onPress={() => handleSuggestionPress(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.tagText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  mainSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#f5f7fa",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  inputFocused: {
    borderColor: "#007AFF",
    backgroundColor: "#fff",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    backgroundColor: "#007AFF",
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  mobileButton: {
    alignSelf: "stretch",
    marginTop: 12,
    marginHorizontal: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  subInput: {
    backgroundColor: "#f5f7fa",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#333",
    borderWidth: 1,
    borderColor: "#f5f7fa",
    margin: 8,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  suggestionsContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
    marginBottom: 10,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  suggestionsScroll: {
    paddingRight: 20,
  },
  tag: {
    backgroundColor: "#edf2f7",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  tagText: {
    fontSize: 14,
    color: "#2d3748",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
});

export default SearchBox;
