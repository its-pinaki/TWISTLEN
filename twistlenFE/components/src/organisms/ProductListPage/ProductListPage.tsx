import { View, Text } from "react-native";
import React from "react";
import ProductContainer from "../../molecules/ProductContainer/ProductContainer";
import ActionInput from "../../molecules/ActionInput/ActionInput";
import ScrollableContainer from "../../molecules/ScrollableContainer/ScrollableContainer";
import Button from "../../atoms/Button/Button";

const ProductListPage = () => {
  return (
    <View>
      <Text>ProductListPage</Text>
      <ProductContainer/>
      <ActionInput/>
      <View style={{ width: 100 }}>
        <ScrollableContainer
          data={["A", "B", "C", "A", "B", "C", "A", "B", "C"]}
          renderItem={({ item }) => (
            <Text style={{ marginHorizontal: 10 }}>{item}</Text>
          )}
          horizontal
        />
      </View>
    </View>
  );
};

export default ProductListPage;
