import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type ChipItem = {
  id: string;
  label: string;
  value: string;
};

type ScrollableChipsProps = {
  chips: ChipItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  chipStyle?: object;
  activeChipStyle?: object;
  textStyle?: object;
  activeTextStyle?: object;
  showArrows?: boolean;
};

const ScrollableChips: React.FC<ScrollableChipsProps> = ({
  chips,
  selectedValue,
  onSelect,
  chipStyle = {},
  activeChipStyle = {},
  textStyle = {},
  activeTextStyle = {},
  showArrows = true,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(width);

  const handleScroll = (direction: "left" | "right") => {
    const scrollAmount = containerWidth * 0.6; // Scroll 60% of container width
    const currentOffset = flatListRef.current?.getScrollableNode()?.contentOffset?.x || 0;
    const newOffset = direction === "left" 
      ? Math.max(0, currentOffset - scrollAmount)
      : Math.min(contentWidth - containerWidth, currentOffset + scrollAmount);

    flatListRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });
  };

  const renderChip = ({ item }: { item: ChipItem }) => {
    const isActive = selectedValue === item.value;
    return (
      <TouchableOpacity
        style={[
          styles.chip,
          chipStyle,
          isActive && [styles.activeChip, activeChipStyle],
        ]}
        onPress={() => onSelect(item.value)}
      >
        <Text
          style={[
            styles.chipText,
            textStyle,
            isActive && [styles.activeText, activeTextStyle],
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View 
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {showArrows && contentWidth > containerWidth && (
        <TouchableOpacity
          style={[styles.arrow, styles.leftArrow]}
          onPress={() => handleScroll("left")}
        >
          <AntDesign name="left" size={20} color="#666" />
        </TouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        data={chips}
        renderItem={renderChip}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        keyExtractor={(item) => item.id}
        onContentSizeChange={(w) => setContentWidth(w)}
        decelerationRate="fast"
      />

      {showArrows && contentWidth > containerWidth && (
        <TouchableOpacity
          style={[styles.arrow, styles.rightArrow]}
          onPress={() => handleScroll("right")}
        >
          <AntDesign name="right" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    position: "relative",
  },
  chipsContainer: {
    // paddingHorizontal: 8,
    alignItems: "center",
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  activeChip: {
    backgroundColor: "#6200ee",
  },
  chipText: {
    color: "#333",
    fontSize: 14,
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  arrow: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 1,
    elevation: 2,
  },
  leftArrow: {
    position: "absolute",
    left: 4,
    zIndex: 2,
  },
  rightArrow: {
    position: "absolute",
    right: 4,
    zIndex: 2,
  },
});

export default ScrollableChips;