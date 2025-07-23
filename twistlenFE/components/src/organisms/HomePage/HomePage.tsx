import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import HomeCard from "./HomeCard/HomeCard";
import SearchBox from "./SearchBox/SearchBox";
import Typography from "../../atoms/Typography/Typography";
import Button from "../../atoms/Button/Button";

const HomePage = () => {
  const stories = [
    {
      id: "1",
      name: "Riya's Loom",
      description:
        "This scarf was made by my grandmother during winter evenings.",
      tags: ["#handmade", "#local"],
      title: "A Winter's Weave",
    },
    {
      id: "2",
      name: "Vikas Digital",
      description:
        "Inspired by my first job – this digital planner is my daily driver.",
      tags: ["#digitalDownload"],
      title: "My First Digital Planner",
    },
  ];
  return (
    <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto px-4" }}>
      <SearchBox />
      <HomeCard
        header="Trending Bundles"
        data={stories}
        renderTop={(item) => (
          <View style={styles.tagContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {item.title}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        )}
        renderMiddle={(item) => (
          <View
            style={{ $$css: true, _: "flex-col sm:flex-row justify-between" }}
          >
            <Button
              title={"Helpful (29)"}
              buttonColor="#4F46E5"
              borderRadius={8}
              borderColor="#D1D5DB"
              textColor="#FFFFFF"
              verticalPadding={2}
              horizontalPadding={20}
              style={{ alignSelf: "flex-start", margin: 3 }}
              textStyle={{ fontSize: 12 }}
            />
            <Typography
              text={"2 days ago"}
              style={{
                fontSize: 12,
                fontWeight: "normal",
                // fontFamily: "Poppins",
                color: "#6B7280",
                margin: 3,
              }}
            />
          </View>
        )}
        renderFooter={() => <></>}
      />
      <HomeCard
        header="Matches For Your Recent Quotes"
        data={stories}
        renderTop={(item) => (
          <View
            style={{ backgroundColor: "#0284C7", padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: "#ffffff" }}>
              Found For Your Quote: Bluetooth speaker under 2000
            </Text>
          </View>
        )}
        renderMiddle={(item) => (
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageBackground
                source={{ uri: "https://picsum.photos/200" }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 10,
                  backgroundColor: "#E0F7FA",
                  marginRight: 10,
                }}
                imageStyle={{
                  borderRadius: 50,
                  borderColor: "#E5E7EB",
                  borderWidth: 1,
                }}
              ></ImageBackground>
              <View>
                <Typography
                  text={"BlueTooth Speaker"}
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "",
                    color: "#000000",
                    margin: 0,
                  }}
                />
                <Typography
                  text={"11100/-"}
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    fontFamily: "",
                    color: "#6B7280",
                    margin: 0,
                  }}
                />
              </View>
            </View>
            <Text style={styles.description}>"{item.description}"</Text>
          </>
        )}
        renderFooter={(item) => (
          <View
            style={{ $$css: true, _: "flex-col sm:flex-row justify-around" }}
          >
            <Button
              title={"View Details"}
              buttonColor="#4F46E5"
              borderRadius={8}
              borderColor="#D1D5DB"
              textColor="#FFFFFF"
              verticalPadding={5}
              horizontalPadding={20}
              style={{ alignSelf: "flex-start" }}
              textStyle={{ fontSize: 12 }}
            />
            <Button
              title={"Save For Later"}
              buttonColor="#ffffff"
              borderRadius={8}
              textColor="#FFFFFF"
              verticalPadding={5}
              horizontalPadding={20}
              style={{
                alignSelf: "flex-start",

                borderColor: "#D1D5DB ",
                borderWidth: 1,
              }}
              textStyle={{ fontSize: 12, color: "#4F46E5" }}
            />
          </View>
        )}
      />
      <HomeCard
        header="Stories from Sellers"
        data={stories}
        renderTop={(item) => <Text style={styles.title}>{item.name}</Text>}
        renderMiddle={(item) => (
          <Text style={styles.description}>"{item.description}"</Text>
        )}
        renderFooter={(item) => (
          <View style={styles.tagContainer}>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        )}
      />
      <HomeCard
        header="Quotes From Communities"
        data={stories}
        renderTop={(item) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ImageBackground
              source={{ uri: "https://picsum.photos/200" }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: "#E0F7FA",
                marginRight: 10,
              }}
              imageStyle={{
                borderRadius: 50,
                borderColor: "#E5E7EB",
                borderWidth: 1,
              }}
            ></ImageBackground>
            <View>
              <Typography
                text={"User098@er"}
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "",
                  color: "#000000",
                  margin: 0,
                }}
              />
              <Typography
                text={"#sku-231"}
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "",
                  color: "#6B7280",
                  margin: 0,
                }}
              />
            </View>
          </View>
        )}
        popularSuggestions={["Handmade", "Digital"]}
        renderMiddle={(item) => (
          <View style={styles.tagContainer}>
            <Text style={styles.description}>"{item.description}"</Text>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        )}
        renderFooter={(item) => (
          <View
            style={{ $$css: true, _: "flex-col sm:flex-row justify-between" }}
          >
            <Button
              title={"I Need Too"}
              buttonColor="#4F46E5"
              borderRadius={8}
              borderColor="#D1D5DB"
              textColor="#FFFFFF"
              verticalPadding={2}
              horizontalPadding={20}
              style={{ alignSelf: "flex-start", margin: 3 }}
              textStyle={{ fontSize: 12 }}
            />
            <Typography
              text={"Comments (200)"}
              style={{
                fontSize: 12,
                fontWeight: "normal",
                // fontFamily: "Poppins",
                color: "#6B7280",
                margin: 3,
              }}
            />
          </View>
        )}
      />
      <HomeCard
        header="People's Comments"
        data={stories}
        renderTop={(item) => (
          <View style={styles.tagContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              {item.title}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        )}
        renderMiddle={(item) => (
          <View
            style={{ $$css: true, _: "flex-col sm:flex-row justify-between" }}
          >
            <Button
              title={"Helpful (29)"}
              buttonColor="#4F46E5"
              borderRadius={8}
              borderColor="#D1D5DB"
              textColor="#FFFFFF"
              verticalPadding={2}
              horizontalPadding={20}
              style={{ alignSelf: "flex-start", margin: 3 }}
              textStyle={{ fontSize: 12 }}
            />
            <Typography
              text={"2 days ago"}
              style={{
                fontSize: 12,
                fontWeight: "normal",
                // fontFamily: "Poppins",
                color: "#6B7280",
                margin: 3,
              }}
            />
          </View>
        )}
        renderFooter={(item) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ImageBackground
              source={{ uri: "https://picsum.photos/200" }}
              style={{
                height: 30,
                width: 30,
                borderRadius: 50,
                backgroundColor: "#E0F7FA",
                marginRight: 10,
              }}
              imageStyle={{
                borderRadius: 50,
                borderColor: "#E5E7EB",
                borderWidth: 1,
              }}
            ></ImageBackground>
            <View>
              <Typography
                text={"User098@er"}
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "",
                  color: "#000000",
                  margin: 0,
                }}
              />
              <Typography
                text={"#sku-231"}
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  fontFamily: "",
                  color: "#6B7280",
                  margin: 0,
                }}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#3b3b98",
  },
  description: {
    fontStyle: "italic",
    color: "#333",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  tag: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    fontSize: 12,
  },
});
