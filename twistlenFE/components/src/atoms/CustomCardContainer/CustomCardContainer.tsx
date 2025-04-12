import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

interface KeyValuePair {
  key: string;
  value: string; // value is always a string
  data?: string[]; // Optional data for the modal list
}

interface Section {
  subtitle?: string;
  linkLabel?: string;
  onPress?: () => void;
  footerlinkLabel?: string;
  onfooterPress?: () => void;
  keyValueList?: KeyValuePair[];
  isSeparate?: boolean;
}

interface Button {
  title: string;
  onPress: () => void;
  color?: string;
}

interface CustomCardContainerProps {
  sections: Section[];
  imageSource?: { uri: string }; // Optional image source
  buttons?: Button[];
}

const CustomCardContainer: React.FC<CustomCardContainerProps> = ({
  sections,
  imageSource,
  buttons,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState<string>("");

  const openModal = (data: string[], title: string) => {
    setModalData(data);
    setModalTitle(title);
    setModalVisible(true);
  };

  const openModalWithValue = (value: string, title: string) => {
    setModalData([value]);
    setModalTitle(title);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const truncateText = (text: string, limit: number = 30) => {
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Optional Image */}
        {imageSource && <Image source={imageSource} style={styles.image} />}

        {/* Sections */}
        {sections?.map((section, index) => (
          <View key={index} style={styles.section}>
            {section?.onPress && section?.linkLabel ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  {section?.subtitle && (
                    <Text style={styles.subtitle}>{section.subtitle}</Text>
                  )}
                </View>
                <View>
                  <TouchableOpacity onPress={section.onPress}>
                    <Text
                      style={{
                        color: "#007bff",
                        textDecorationLine: "underline",
                      }}
                    >
                      <Text
                        style={{
                          color: "#007bff",
                          textDecorationLine: "underline",
                          flexShrink: 1,
                          fontSize:11
                        }}
                      >
                        {section.linkLabel}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : section?.subtitle ? (
              <Text style={styles.subtitle}>{section.subtitle}</Text>
            ) : null}
            {section?.keyValueList?.length > 0 && (
              <View style={styles.keyValueContainer}>
                {section?.keyValueList?.map((item, idx) => {
                  // Skip rendering if data is an empty array
                  if (item.data && item.data.length === 0) return null;
                  if (item.value === "") return null;

                  const truncatedValue = truncateText(item.value);

                  return (
                    <View
                      key={idx}
                      style={
                        section?.isSeparate
                          ? styles.separateKeyValueRow
                          : styles.keyValueRow
                      }
                    >
                      <Text style={styles.key}>{item.key}</Text>
                      {item?.data ? (
                        <TouchableOpacity
                          onPress={
                            () =>
                              item.data
                                ? openModal(item.data, item.key) // Open modal with list if data exists
                                : openModalWithValue(item.value, item.key) // Open modal with the value
                          }
                        >
                          <Text
                            style={[
                              styles.value,
                              (item.data || item.value) && {
                                textDecorationLine: "underline",
                                color: "#007bff",
                              },
                            ]}
                          >
                            {truncatedValue}
                          </Text>
                        </TouchableOpacity>
                      ) : item.value.length > 30 ? (
                        <TouchableOpacity
                          onPress={
                            () =>
                              item.data
                                ? openModal(item.data, item.key) // Open modal with list if data exists
                                : openModalWithValue(item.value, item.key) // Open modal with the value
                          }
                        >
                          <Text
                            style={[
                              styles.value,
                              (item.data || item.value) && {
                                textDecorationLine: "underline",
                                color: "#007bff",
                              },
                            ]}
                          >
                            {truncatedValue}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <Text>{truncatedValue}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            )}

            {section?.onfooterPress && section?.footerlinkLabel && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <View>
                  <TouchableOpacity onPress={section.onfooterPress}>
                    <Text
                      style={{
                        color: "#007bff",
                        textDecorationLine: "underline",
                      }}
                    >
                      <Text
                        style={{
                          color: "#007bff",
                          textDecorationLine: "underline",
                          flexShrink: 1, // Allow text to shrink to fit within the container
                          fontSize:11
                        }}
                      >
                        {section.footerlinkLabel}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        ))}

        {/* Buttons */}
        {buttons && (
          <View style={styles.buttonRow}>
            {buttons?.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  {
                    borderColor: button.color || "#007bff",
                    backgroundColor: `${button.color || "#007bff"}22`,
                  },
                ]}
                onPress={button.onPress}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: button.color || "#007bff" },
                  ]}
                >
                  {button.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Modal to show details */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              {/* Use ScrollView for a scrollable list in the modal */}
              <ScrollView style={styles.modalList}>
                {modalData?.map((item, idx) => (
                  <Text key={idx} style={styles.modalItem}>
                    {item}
                  </Text>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={{
                  borderColor: "#007bff",
                  backgroundColor: `#007bff22`,
                  padding: 6,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                }}
                onPress={closeModal}
              >
                <Text style={{ color: "#007bff" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  keyValueContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 8,
  },
  keyValueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  separateKeyValueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderWidth: 3,
    borderColor: "#ffffff",
    padding: 3,
  },
  key: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555",
  },
  value: {
    fontSize: 14,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 0.5,
    alignItems: "center",
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalList: {
    maxHeight: 200, // Maximum height for the list, adjust as needed
  },
  modalItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
});

export default CustomCardContainer;
