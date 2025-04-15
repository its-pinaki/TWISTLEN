import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import Admin from "@/adminconfig/Admin";
import SidebarNavigation from "@/components/src/atoms/SideBarNavigation/SideBarNavigation";
import ProductManager from "@/components/src/organisms/ProductManager/ProductManager";

export default function AdminScreen() {
  const { setIsLoading, isLoading, setPages, pages } = usePageStore();
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [newPageName, setNewPageName] = useState(""); // State for page name input

  const fetchPages = async () => {
    setIsLoading({ type: "page", status: true });
    try {
      const response = await axios.get(`${rootUrl}/Prod/pages`);
      setPages(response.data);
      setIsLoading({ type: "page", status: false });
    } catch (error) {
      console.error("Error fetching pages:", error);
      setIsLoading({ type: "page", status: false });
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);
  console.log("pages", pages);

  const tabs = [
    {
      name: "CRM MANAGER",
      component: Admin,
      iconService: "FontAwesome5",
      iconName: "pager",
    },
    {
      name: "PRODUCT MANAGER",
      component: ProductManager,
      iconService: "Entypo",
      iconName: "shop",
    },
    // { name: "ORDER MANAGER", component: EquipmentManager },
    // { name: "USER MANAGER", component: LocationManager },
  ];

  return (
    <View style={styles.container}>
      <SidebarNavigation tabs={tabs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
