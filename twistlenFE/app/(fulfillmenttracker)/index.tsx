import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import AuthForm from "@/components/src/organisms/AuthForm/AuthForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { rootUrl } from "@/constants/endPoints";
import { usePageStore } from "@/stores/pageStores";
import { componentMap } from "../import-components";
import FulfillmentTracker from "@/components/src/organisms/FulfillmentTracker/FulfillmentTracker";

export default function FulfillmentTrackerScreen() {
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
  
  return (
    <View style={styles.container}>
      <Text>Hi This is AuthScreen</Text>
      <FulfillmentTracker/>
      {/* {pages
        ?.find((page) => page.name === "Home")
        ?.objects?.map((obj) => {
          const Component = componentMap[obj.type];
          return Component ? <Component key={obj.id} {...obj.properties} /> : null;
        })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
