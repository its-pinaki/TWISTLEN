import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import { useTheme } from "react-native-paper";

interface OfferFormProps {
  onSubmit: (offer: OfferData) => void;
  products: any[];
  initialData?: OfferData | null;
  isLoading?: boolean;
}

export interface OfferData {
  offerName: string;
  offerDescription: string;
  totalPrice: string;
  discountedPrice: string;
  duration: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  products: any[];
}

const OfferAddition: React.FC<OfferFormProps> = ({
  onSubmit,
  products,
  initialData,
  isLoading = false,
}) => {
  const theme = useTheme();
  const [endDate, setEndDate] = useState<Date>(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7); // Default 7 days from now
    return defaultDate;
  });

  const [formData, setFormData] = useState<OfferData>({
    offerName: initialData?.offerName || "",
    offerDescription: initialData?.offerDescription || "",
    totalPrice: initialData?.totalPrice || "",
    discountedPrice: initialData?.discountedPrice || "",
    duration: initialData?.duration || {
      days: "7",
      hours: "0",
      minutes: "0",
      seconds: "0",
    },
    products: initialData?.products || [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    // Calculate end date whenever duration changes
    const now = new Date();
    const newEndDate = new Date(now);
    
    newEndDate.setDate(now.getDate() + parseInt(formData.duration.days || "0"));
    newEndDate.setHours(now.getHours() + parseInt(formData.duration.hours || "0"));
    newEndDate.setMinutes(now.getMinutes() + parseInt(formData.duration.minutes || "0"));
    newEndDate.setSeconds(now.getSeconds() + parseInt(formData.duration.seconds || "0"));
    
    setEndDate(newEndDate);
  }, [formData.duration]);

  const handleChange = (field: keyof OfferData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDurationChange = (field: keyof OfferData['duration'], value: string) => {
    // Ensure only numbers are entered
    if (/^\d*$/.test(value)) {
      setFormData({
        ...formData,
        duration: {
          ...formData.duration,
          [field]: value,
        },
      });
    }
  };

  const handleProductSelect = (selectedProducts: any[]) => {
    setFormData({ ...formData, products: selectedProducts });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        label="Offer Name"
        value={formData.offerName}
        onChangeText={(text) => handleChange("offerName", text)}
        placeholder="Summer Sale"
        style={styles.input}
      />

      <Input
        label="Offer Description"
        value={formData.offerDescription}
        onChangeText={(text) => handleChange("offerDescription", text)}
        placeholder="Describe your offer"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <View style={styles.priceContainer}>
        <Input
          label="Original Price"
          value={formData.totalPrice}
          onChangeText={(text) => handleChange("totalPrice", text)}
          placeholder="100.00"
          keyboardType="decimal-pad"
          style={[styles.input, { flex: 1 }]}
        />

        <Input
          label="Discounted Price"
          value={formData.discountedPrice}
          onChangeText={(text) => handleChange("discountedPrice", text)}
          placeholder="79.99"
          keyboardType="decimal-pad"
          style={[styles.input, { flex: 1 }]}
        />
      </View>

      <CustomDropDown
        title="Select Products"
        value={products}
        onSelect={handleProductSelect}
        uniqueKey="id"
        displayName="name"
        selectedItems={formData.products}
        single={false}
        setSelectedItems={handleProductSelect}
        texttype="products"
        searchPlaceholder="Search products..."
        bordercolor={theme.colors.primary}
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Offer Duration</Text>
      <View style={styles.durationContainer}>
        <View style={styles.durationInputContainer}>
          <Input
            label="Days"
            value={formData.duration.days}
            onChangeText={(text) => handleDurationChange("days", text)}
            placeholder="0"
            keyboardType="numeric"
            style={styles.durationInput}
          />
        </View>
        <View style={styles.durationInputContainer}>
          <Input
            label="Hours"
            value={formData.duration.hours}
            onChangeText={(text) => handleDurationChange("hours", text)}
            placeholder="0"
            keyboardType="numeric"
            style={styles.durationInput}
          />
        </View>
        <View style={styles.durationInputContainer}>
          <Input
            label="Minutes"
            value={formData.duration.minutes}
            onChangeText={(text) => handleDurationChange("minutes", text)}
            placeholder="0"
            keyboardType="numeric"
            style={styles.durationInput}
          />
        </View>
        <View style={styles.durationInputContainer}>
          <Input
            label="Seconds"
            value={formData.duration.seconds}
            onChangeText={(text) => handleDurationChange("seconds", text)}
            placeholder="0"
            keyboardType="numeric"
            style={styles.durationInput}
          />
        </View>
      </View>

      <View style={styles.timeInfoContainer}>
        <Text style={styles.timeInfoText}>
          Offer will end on: {endDate.toLocaleString()}
        </Text>
      </View>

      <Button
        title={initialData ? "Update Offer" : "Create Offer"}
        onPress={handleSubmit}
        loading={isLoading}
        disabled={isLoading}
        style={styles.submitButton}
        buttonColor={theme.colors.primary}
        textColor="#fff"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  durationInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  durationInput: {
    textAlign: 'center',
  },
  timeInfoContainer: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  timeInfoText: {
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    marginTop: 8,
    width: "100%",
  },
});

export default OfferAddition;