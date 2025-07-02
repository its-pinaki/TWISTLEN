import { Link } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { rootUrl } from "@/constants/endPoints";
import { usePageStore } from "@/stores/pageStores";
import { componentMap } from "../import-components";
import { useSegments } from 'expo-router';

export default function ProfileScreen() {
  const { setIsLoading, isLoading, setPages, pages } = usePageStore();
  const segments = useSegments();
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
    <ScrollView>
      <View style={styles.container}>
        {/* <Text>Hi This is AuthScreen</Text> */}
        {pages
          ?.find((page) => page.name === segments.join('/'))
          ?.objects?.sort((a, b) => a.position.y - b.position.y)?.map((obj, index, arr) => {
            const Component = componentMap[obj.type];
            const isFirst = index === 0;
            const isLast = index === arr.length - 1;
            return Component ? (
              <View
          style={{
            marginVertical: isFirst || isLast ? 0 : 50,
          }}
          key={obj.id}
              >
          <Component key={obj.id} {...obj.properties} />
              </View>
            ) : null;
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
