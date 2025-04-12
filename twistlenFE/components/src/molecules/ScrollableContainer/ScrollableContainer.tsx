import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

type ScrollableContainerProps = {
  data: any[];
  renderItem: ({ item }: { item: any }) => JSX.Element;
  horizontal?: boolean;
  keyExtractor?: (item: any, index: number) => string;
  style?: object;
  contentContainerStyle?: object;
  itemPadding?: number;
};

const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  data,
  renderItem,
  horizontal = false,
  keyExtractor = (_, index) => index.toString(),
  style = {},
  contentContainerStyle = {},
  itemPadding = 10,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={{ padding: itemPadding }}>{renderItem({ item })}</View>
        )}
        horizontal={horizontal}
        keyExtractor={keyExtractor}
        style={[styles.flatList, style]}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
        showsHorizontalScrollIndicator={horizontal}
        showsVerticalScrollIndicator={!horizontal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
  },
  flatList: {
    flexGrow: 0,
    paddingHorizontal: 5,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ScrollableContainer;
