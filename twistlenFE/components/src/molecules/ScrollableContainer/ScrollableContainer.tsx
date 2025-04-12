import React, { useRef, useState } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type ScrollableContainerProps = {
  data: any[];
  renderItem: ({ item }: { item: any }) => JSX.Element;
  horizontal?: boolean;
  keyExtractor?: (item: any, index: number) => string;
  style?: object;
  contentContainerStyle?: object;
  itemPadding?: number;
  itemWidth?: number; // Custom item width
};

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  data,
  renderItem,
  horizontal = true,
  keyExtractor = (_, index) => index.toString(),
  style = {},
  contentContainerStyle = {},
  itemPadding = 10,
  itemWidth = width * 0.8, // Default item width
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= data.length) newIndex = data.length - 1;

    setCurrentIndex(newIndex);
    flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
  };

  return (
    <View style={[styles.container, style]}>
      {horizontal && currentIndex > 0 && (
        <TouchableOpacity
          style={[styles.arrow, styles.leftArrow]}
          onPress={() => handleScroll("left")}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { padding: itemPadding, width: itemWidth }]}>
            {renderItem({ item })}
          </View>
        )}
        horizontal={horizontal}
        keyExtractor={keyExtractor}
        style={styles.flatList}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={!horizontal}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / itemWidth);
          setCurrentIndex(index);
        }}
      />

      {horizontal && currentIndex < data.length - 1 && (
        <TouchableOpacity
          style={[styles.arrow, styles.rightArrow]}
          onPress={() => handleScroll("right")}
        >
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  flatList: {
    flexGrow: 0,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -12 }],
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 10,
    borderRadius: 20,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
});

export default ScrollableContainer;
