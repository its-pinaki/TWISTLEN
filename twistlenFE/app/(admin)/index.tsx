import { usePageStore } from "@/stores/pageStores";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { rootUrl } from "@/constants/endPoints";
import Admin from "@/adminconfig/Admin";
import SidebarNavigation from "@/components/src/atoms/SideBarNavigation/SideBarNavigation";
import ProductManager from "@/components/src/organisms/ProductManager/ProductManager";
import Header from "@/components/src/atoms/Header/Header";
import Footer from "@/components/src/atoms/Footer/Footer";
import OrderManager from "@/components/src/organisms/OrderManager/OrderManager";
import ImageTester from "@/components/src/molecules/OfferSections/ImageTester";

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
    {
      name: "ORDER MANAGER",
      component: OrderManager,
      iconService: "Ionicons",
      iconName: "file-tray-stacked",
    },
    // { name: "USER MANAGER", component: LocationManager },
  ];

  return (
    <>
      <Header />
      <ScrollView
        style={{
          flex: 1,
          padding: 16,
        }}
      >
        <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto px-4" }}>
          <SidebarNavigation tabs={tabs} />
        </View>
      </ScrollView>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
