import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import Button from "../../atoms/Button/Button";

const AffiliateCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.productInfo}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/200" }}
            style={styles.productImage}
            imageStyle={{ borderRadius: 8 }}
          ></ImageBackground>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "column",
              flexShrink: 1,
              maxWidth: "100%",
            }}
          >
            <Text style={styles.productTitle}>
              Premium Wireless Earbuds aafa
            </Text>
            <Text style={styles.productCategory}>Electronics Category</Text>
          </View>
        </View>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>Commission Rate</Text>
        <Text style={styles.greenText}>15% per sale</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Product Price</Text>
        <Text style={styles.text}>₹999</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Your Earnings</Text>
        <Text style={styles.greenText}>₹150 per sale</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Monthly Cap</Text>
        <Text style={styles.text}>₹5,000</Text>
      </View>

      <View style={styles.linkBox}>
        <Typography
          text={"https://yourbrand.com/p/123?ref=alice"}
          style={{ fontSize: 16, fontWeight: "regular" }}
        />
        {/* <IconBlock
          icon={{
            serviceType: "AntDesign",
            iconName: "copy1",
            size: 18,
            color: "#2563EB",
            noBorder: true,
          }}
        /> */}
      </View>

      <View style={styles.buttonRow}>
        <Button
          customContent={
            <IconBlock
              icon={{
                serviceType: "Feather",
                iconName: "copy",
                size: 16,
                color: "#FFFFFF",
                noBorder: true,
                label: "Copy Link",
                // reverseLabel: true,
                textStyle: {
                  fontSize: 16,
                  fontWeight: "regular",
                  color: "#FFFFFF",
                },
              }}
            />
          }
          buttonColor="#2563EB"
          borderRadius={8}
          borderColor="#E5E7EB"
        />
        <Button
          customContent={
            <IconBlock
              icon={{
                serviceType: "EvilIcons",
                iconName: "refresh",
                size: 16,
                color: "#374151",
                noBorder: true,
                label: "New Link",
                // reverseLabel: true,
                textStyle: {
                  fontSize: 16,
                  fontWeight: "regular",

                  color: "#374151",
                },
              }}
            />
          }
          buttonColor="#F3F4F6"
          borderRadius={8}
          borderColor="#E5E7EB"
        />
        <IconBlock
          icon={{
            serviceType: "Entypo",
            iconName: "share",
            size: 16,
            color: "#374151",
            noBorder: true,
            style: {
              backgroundColor: "#F3F4F6",
              borderRadius: 8,
              paddingHorizontal: 5,
            },
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          backgroundColor: "#F9FAFB",
          borderColor: "#E5E7EB",
          borderTopWidth: 0.1,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            text={"104"}
            style={{
              fontSize: 24,
              fontWeight: "500",

              color: "#000000",
              margin: 0,
            }}
          />
          <Typography
            text={"Clicks"}
            style={{
              fontSize: 14,
              fontWeight: "regular",

              color: "#6B7280",
              margin: 0,
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            text={"5"}
            style={{
              fontSize: 24,
              fontWeight: "500",

              color: "#000000",
              margin: 0,
            }}
          />
          <Typography
            text={"Conversions"}
            style={{
              fontSize: 14,
              fontWeight: "regular",
              color: "#6B7280",
              margin: 0,
            }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            text={"750"}
            style={{
              fontSize: 24,
              fontWeight: "500",
              color: "#059669",
              margin: 0,
            }}
          />
          <Typography
            text={"Earnings"}
            style={{
              fontSize: 14,
              fontWeight: "regular",
              color: "#6B7280",
              margin: 0,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "100%",
  },
  header: {
    marginBottom: 10,
  },
  productInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  productImage: {
    height: 64,
    width: 64,
    borderRadius: 5,
    backgroundColor: "#E0F7FA",
    marginRight: 10,
  },
  productTitle: {
    fontWeight: "500",
    fontSize: 18,
    color: "#000000",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  productCategory: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "regular",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#F9FAFB",
  },
  label: {
    fontSize: 16,
    color: "#4B5563",
    fontWeight: "regular",
  },
  text: {
    color: "#4B5563",
    fontSize: 16,
    fontWeight: "500",
  },
  greenText: {
    color: "#059669",
    fontSize: 16,
    fontWeight: "500",
  },
  linkBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "#E5E7EB",
    borderRadius: 6,
  },
  linkInput: {
    flex: 1,
    height: 40,
  },
  iconBtn: {
    padding: 6,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  copyBtn: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 6,
    marginRight: 6,
  },
  newLinkBtn: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 6,
    marginLeft: 6,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
  },
});

export default AffiliateCard;
