import React from "react";
import { View } from "react-native";
import { componentMapping } from "@/shared-library/shared-library/libs/componentConfig";

// Define types
interface Position {
  x: number;
  y: number;
}

interface ComponentData {
  id: number;
  type: string;
  position: Position;
  properties: Record<string, any>;
}

interface DynamicRendererProps {
  componentsData: ComponentData[];
}

const DynamicRenderer: React.FC<DynamicRendererProps> = ({
  componentsData,
}) => {
  console.log("componentsData", componentsData);
  return (
    <View>
      {componentsData?.map(({ id, type, position, properties }) => {
        const Component =
          componentMapping[type as keyof typeof componentMapping];

        return Component ? (
          <View key={id}>
            <Component {...properties} />
          </View>
        ) : null;
      })}
    </View>
  );
};

export default DynamicRenderer;
