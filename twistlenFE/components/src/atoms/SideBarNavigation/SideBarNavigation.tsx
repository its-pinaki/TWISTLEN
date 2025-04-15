import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Icons from "@expo/vector-icons";

const SidebarNavigation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const handleResize = ({ window }) => {
      setScreenWidth(window.width);
      if (window.width < 600) {
        setCollapsed(true); // Auto-collapse on small screen
      }
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    // Initial check
    if (screenWidth < 600) {
      setCollapsed(true);
    }

    return () => {
      subscription?.remove?.(); // Clean up on unmount
    };
  }, []);

  const ActiveComponent = tabs.find((tab) => tab.name === activeTab)?.component;
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View
        style={[
          styles.sidebar,
          collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded,
        ]}
      >
        <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
          <Icons.AntDesign
            name={
              collapsed ? "menuunfold" : "menufold"
            }
            size={24}
            color="#fff"
          />
        </TouchableOpacity>

        {tabs.map((tab) => {
          const IconComponent = Icons[tab.iconService] || Icons.Ionicons;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[
                styles.tabButton,
                activeTab === tab.name && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab.name)}
            >
              <IconComponent
                name={tab.iconName || "apps-outline"}
                size={20}
                color={activeTab === tab.name ? "#fff" : "#bbb"}
                style={styles.icon}
              />
              {!collapsed && (
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.name && styles.activeTabText,
                  ]}
                >
                  {tab.name}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Main Content */}
      <View
        style={[
          styles.content,
          { width: screenWidth - (collapsed ? 60 : 240) },
        ]}
      >
        {ActiveComponent && <ActiveComponent />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  sidebar: {
    backgroundColor: "#222",
    paddingTop: 30,
  },
  sidebarExpanded: {
    width: 240,
  },
  sidebarCollapsed: {
    width: 60,
  },
  toggleButton: {
    alignItems: "center",
    marginBottom: 20,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  activeTabButton: {
    backgroundColor: "#444",
  },
  tabText: {
    color: "#bbb",
    fontSize: 14,
    marginLeft: 10,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
});

export default SidebarNavigation;
