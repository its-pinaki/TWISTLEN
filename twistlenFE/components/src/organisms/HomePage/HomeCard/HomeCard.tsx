import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";

type HomeCardProps = {
  header: string;
  noOfCards?: number;
  data: any[];
  renderTop: (item: any) => React.ReactNode;
  renderMiddle: (item: any) => React.ReactNode;
  renderFooter: (item: any) => React.ReactNode;
  popularSuggestions?: string[];
};

const HomeCard: React.FC<HomeCardProps> = ({
  header,
  noOfCards = 2,
  data,
  renderTop,
  renderMiddle,
  renderFooter,
  popularSuggestions,
}) => {
  const handleSuggestionPress = (suggestion: string) => {};
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.header}>{header}</Text>
      {popularSuggestions && (
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularSuggestions?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: "#ffffff",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: "#e2e8f0",
                }}
                onPress={() => handleSuggestionPress(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: "#2d3748",
                    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      <FlatList
        horizontal
        data={data.slice(0, noOfCards)}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.top}>{renderTop(item)}</View>
            <View style={styles.middle}>{renderMiddle(item)}</View>
            <View style={styles.footer}>{renderFooter(item)}</View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    paddingLeft: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 10,
    elevation: 3,
    borderColor: "#ddd",
    borderWidth: 1,
    shadowColor: "#000",
    width: 250,
  },
  top: {
    marginBottom: 8,
  },
  middle: {
    marginBottom: 8,
  },
  footer: {},
});

export default HomeCard;
