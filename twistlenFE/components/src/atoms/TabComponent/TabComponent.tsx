import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface TabComponentProps {
  tabs: { [key: string]: React.ReactNode };
}

const TabComponent: React.FC<TabComponentProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(Object.keys(tabs)[0]);

  return (
    <View style={styles.container}>
      {/* Tab Headers */}
      <View style={styles.tabContainer}>
        {Object.keys(tabs).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={activeTab === tab ? styles.activeText : styles.inactiveText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.content}>{tabs[activeTab]}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  inactiveTab: {},
  activeText: {
    color: "blue",
    fontWeight: "bold",
  },
  inactiveText: {
    color: "gray",
  },
  content: {
    padding: 10,
  },
});

export default TabComponent;

// Usage Example:
// import TabComponent from "./TabComponent";
// import ComponentA from "./ComponentA";
// import ComponentB from "./ComponentB";

// const tabs: { [key: string]: React.ReactNode } = {
//   "Tab 1": <ComponentA />, 
//   "Tab 2": <ComponentB />,
// };

// <TabComponent tabs={tabs} />;