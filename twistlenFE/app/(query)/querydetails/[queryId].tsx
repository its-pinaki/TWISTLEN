// const { productId, ref, refv1 } = useLocalSearchParams();

import { useLocalSearchParams, useSegments } from "expo-router";
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Animated,
  StyleSheet,
} from "react-native";
import ProductCard from "@/components/src/molecules/ProductCard/ProductCard";
import OfferSections from "@/components/src/molecules/OfferSections/OfferSections";
import ThreadedDiscussion from "@/components/src/molecules/DiscussionThreads/ThreadedDiscussion";
import { CommentType } from "@/components/src/molecules/DiscussionThreads/types";
import Header from "@/components/src/atoms/Header/Header";
import Footer from "@/components/src/atoms/Footer/Footer";
import ProductDetails from "@/components/src/organisms/ProductDetails/ProductDetails";
import { usePageStore } from "@/stores/pageStores";
import axios from "axios";
import { rootUrl } from "@/constants/endPoints";
import { useEffect } from "react";
import { componentMap } from "@/app/import-components";

const QueryScreen = () => {
  const { setIsLoading, isLoading, setPages, pages } = usePageStore();
  const segments = useSegments();
  const { productId, ref, refv1 } = useLocalSearchParams();
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
          ?.find((page) => /^\(query\)\/querydetails\/[^/]+$/.test(page.name))
          ?.objects?.sort((a, b) => a.position.y - b.position.y)
          ?.map((obj, index, arr) => {
            const Component = componentMap[obj.type];
            const isFirst = index === 0;
            const isLast = index === arr.length - 1;
            return Component ? (
              <View
                style={
                  {
                    // marginVertical: isFirst || isLast ? 0 : 50,
                  }
                }
                key={obj.id}
              >
                <Component key={obj.id} {...obj.properties} />
              </View>
            ) : null;
          })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default QueryScreen;
