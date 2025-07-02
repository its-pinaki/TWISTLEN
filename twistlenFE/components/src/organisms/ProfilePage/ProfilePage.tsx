import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import TabComponent from "../../atoms/TabComponent/TabComponent";
import Button from "../../atoms/Button/Button";
import ProfileContainer from "../../molecules/ProfileContainer/ProfileContainer";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import ActionInput from "../../molecules/ActionInput/ActionInput";
import CustomCardContainer from "../../atoms/CustomCardContainer/CustomCardContainer";
import ProductContainer from "../../molecules/ProductContainer/ProductContainer";
import GenericTable from "../../atoms/GenericTable/GenericTable";
import CustomDropDown from "../../atoms/CustomDropDown/CustomDropDown";
import {
  BarChart,
  LineChart,
  PopulationPyramid,
  RadarChart,
} from "react-native-gifted-charts";

const ProfilePage = ({ title }) => {
  const columns = [
    { key: "product", title: "Product" },
    { key: "click", title: "Click", sortable: true },
    { key: "commision", title: "Commision", sortable: true },
    { key: "conversions", title: "Conversions" },
    { key: "earnings", title: "Earnings" },
    { key: "action", title: "Action" },
  ];

  const data = [
    {
      product: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/200" }}
            style={{
              height: 30,
              width: 30,
              borderRadius: 5,
              backgroundColor: "#E0F7FA",
              marginRight: 10,
            }}
            imageStyle={{ borderRadius: 8 }}
          ></ImageBackground>
          <View>
            <Typography
              text={"Wireless HeadPhone Pro"}
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
      ),
      click: (
        <Typography
          text={"1,245"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      commision: (
        <Typography
          text={"15%(150 per sale)"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      conversions: (
        <Typography
          text={"38"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      earnings: (
        <Typography
          text={"1810"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      action: (
        <View
          style={{
            $$css: true,
            _: "flex flex-row gap-2",
          }}
        >
          <IconBlock
            icon={{
              serviceType: "MaterialIcons",
              iconName: "delete",
              size: 16,
              color: "#EF4444",
              noBorder: true,
              style: {
                backgroundColor: "#FEE2E2",
                borderRadius: 8,
                padding: 3,
              },
            }}
          />
          <IconBlock
            icon={{
              serviceType: "AntDesign",
              iconName: "eye",
              size: 16,
              color: "#2563EB",
              noBorder: true,
              style: {
                backgroundColor: "#E5E7EB",
                borderRadius: 8,
                padding: 3,
              },
            }}
          />
        </View>
      ),
    },
  ];
  const barData = [
    { value: 100, label: "M" },
    { value: 200, label: "T" },
    { value: 150, label: "W" },
    { value: 300, label: "T" },
    { value: 250, label: "F" },
    { value: 400, label: "S" },
    { value: 350, label: "S" },
  ];
  return (
    <ScrollView style={styles.container}>
      <View style={{ $$css: true, _: "w-full max-w-[1024px] mx-auto" }}>
        <Text>Profile Page</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            source={{ uri: "https://picsum.photos/200" }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: "#E0F7FA",
              marginRight: 10,
            }}
            imageStyle={{
              borderRadius: 50,
              borderColor: "#E5E7EB",
              borderWidth: 4,
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
        {/* Overview Details */}
        <View
          style={{
            $$css: true,
            _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5",
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
              borderWidth: 0.1,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                text={"Total Earnings"}
                style={{
                  fontSize: 16,
                  fontWeight: "regular",
                  // fontFamily: "Poppins",
                  color: "#6B7280",
                  margin: 0,
                }}
              />
              <IconBlock
                icon={{
                  serviceType: "FontAwesome",
                  iconName: "dollar",
                  size: 16,
                  color: "#10B981",
                  noBorder: true,
                  // style: {
                  //   backgroundColor: "#E5E7EB",
                  //   borderRadius: 8,
                  //   padding: 3,
                  // },
                }}
              />
            </View>
            <Typography
              text={"45,250"}
              style={{
                fontSize: 24,
                fontWeight: "500",
                // fontFamily: "",
                color: "#000000",
                margin: 0,
              }}
            />
            <IconBlock
              icon={{
                serviceType: "EvilIcons",
                iconName: "arrow-up",
                size: 14,
                color: "#059669",
                labelComponent: (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      // fontFamily: "Poppins",
                      color: "#059669",
                      marginTop: 5,
                    }}
                  >
                    2% increased
                  </Text>
                ),
                noBorder: true,
                label: "2% increased",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
              borderWidth: 0.1,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                text={"Pending Payouts"}
                style={{
                  fontSize: 16,
                  fontWeight: "regular",
                  // fontFamily: "Poppins",
                  color: "#6B7280",
                  margin: 0,
                }}
              />
              <IconBlock
                icon={{
                  serviceType: "MaterialCommunityIcons",
                  iconName: "timelapse",
                  size: 16,
                  color: "#F97316",
                  noBorder: true,
                  // style: {
                  //   backgroundColor: "#E5E7EB",
                  //   borderRadius: 8,
                  //   padding: 3,
                  // },
                }}
              />
            </View>
            <Typography
              text={"12,800"}
              style={{
                fontSize: 24,
                fontWeight: "500",
                // fontFamily: "",
                color: "#000000",
                margin: 0,
              }}
            />
            <Typography
              text={"Processing(2 requests)"}
              style={{
                fontSize: 12,
                color: "#F97316",
                marginTop: 2,
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
              borderWidth: 0.1,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                text={"Conversion Rate"}
                style={{
                  fontSize: 16,
                  fontWeight: "regular",
                  // fontFamily: "Poppins",
                  color: "#6B7280",
                  margin: 0,
                }}
              />
              <IconBlock
                icon={{
                  serviceType: "AntDesign",
                  iconName: "piechart",
                  size: 16,
                  color: "#3B82F6",
                  noBorder: true,
                  // style: {
                  //   backgroundColor: "#E5E7EB",
                  //   borderRadius: 8,
                  //   padding: 3,
                  // },
                }}
              />
            </View>
            <Typography
              text={"3.8%"}
              style={{
                fontSize: 24,
                fontWeight: "500",
                // fontFamily: "",
                color: "#000000",
                margin: 0,
              }}
            />
            <IconBlock
              icon={{
                serviceType: "EvilIcons",
                iconName: "arrow-up",
                size: 14,
                color: "#3B82F6",
                labelComponent: (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      // fontFamily: "Poppins",
                      color: "#3B82F6",
                      marginTop: 5,
                    }}
                  >
                    0.5% increased
                  </Text>
                ),
                noBorder: true,
                label: "0.5% increased",
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: "#E5E7EB",
              borderWidth: 0.1,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                text={"Total Sales"}
                style={{
                  fontSize: 16,
                  fontWeight: "regular",
                  // fontFamily: "Poppins",
                  color: "#6B7280",
                  margin: 0,
                }}
              />
              <IconBlock
                icon={{
                  serviceType: "Entypo",
                  iconName: "shopping-cart",
                  size: 16,
                  color: "#8B5CF6",
                  noBorder: true,
                  // style: {
                  //   backgroundColor: "#E5E7EB",
                  //   borderRadius: 8,
                  //   padding: 3,
                  // },
                }}
              />
            </View>
            <Typography
              text={"3.8%"}
              style={{
                fontSize: 24,
                fontWeight: "500",
                // fontFamily: "",
                color: "#000000",
                margin: 0,
              }}
            />
            <IconBlock
              icon={{
                serviceType: "EvilIcons",
                iconName: "arrow-up",
                size: 14,
                color: "#8B5CF6",
                labelComponent: (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      // fontFamily: "Poppins",
                      color: "#8B5CF6",
                      marginTop: 5,
                    }}
                  >
                    0.5% increased
                  </Text>
                ),
                noBorder: true,
                label: "0.5% increased",
              }}
            />
          </View>
        </View>
        {/* Affiliate Details */}
        <View
          style={{
            $$css: true,
            _: "mt-2",
          }}
        >
          <GenericTable
            columns={columns}
            data={data}
            rowsPerPage={3}
            themeColor="#2563EB"
            heading="Your Affiliate Links"
            hideSearch
          />
        </View>

        {/* Linechart Details */}
        <View
          style={{
            $$css: true,
            _: "p-1 bg-white rounded-lg mt-2",
            width: "100%",
          }}
        >
          <View
            style={{
              $$css: true,
              _: "flex-row gap-2 items-center justify-between m-2",
            }}
          >
            <Typography
              text={"Performance Overview"}
              style={{
                fontSize: 16,
                fontWeight: "bold",
                // fontFamily: "Poppins",
                color: "#000000",
                margin: 0,
              }}
            />
            <View>
              <CustomDropDown
                value={[{ id: "1", name: "07 Days" }]}
                uniqueKey="id"
                displayName="name"
                single={true}
                texttype="Last 7 Days"
                searchPlaceholder="Search days..."
                isError={false}
                bordercolor={"#E5E7EB"}
              />
            </View>
          </View>
          <BarChart
            data={barData}
            barWidth={30}
            spacing={20}
            frontColor="#177AD5"
            yAxisColor="#E9E9E9"
            xAxisColor="#E9E9E9"
            yAxisTextStyle={{ color: "gray" }}
            xAxisLabelTextStyle={{ color: "gray", marginTop: 10 }}
            noOfSections={2}
            maxValue={500}
            yAxisLabelWidth={40}
            yAxisLabelPrefix=""
            yAxisLabelSuffix=""
            showReferenceLine1
            referenceLine1Position={250}
            referenceLine1Config={{
              color: "gray",
              dashWidth: 2,
              dashGap: 3,
            }}
            rulesColor="gray"
            rulesType="dashed"
            initialSpacing={10}
          />
        </View>
        {/* withdraw details */}
        <View
          style={{
            $$css: true,
            _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-5",
          }}
        >
          <View
            style={{
              $$css: true,
              _: "p-3 bg-white rounded-lg ",
            }}
          >
            <Typography
              text={"Payout Requests"}
              style={{
                fontSize: 20,
                fontWeight: "bold",
                // fontFamily: "Poppins",
                color: "#000000",
                margin: 0,
              }}
            />
            <View
              style={{
                $$css: true,
                _: "d-flex flex-row gap-2 items-center justify-between bg-gray-50 py-3 my-2 px-2 rounded-lg border-gray-100 border",
              }}
            >
              <View>
                <Typography
                  text={"8,500"}
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    // fontFamily: "Poppins",
                    color: "#000000",
                    margin: 0,
                  }}
                />
                <Typography
                  text={"Requested on Jan 15, 2025"}
                  style={{
                    fontSize: 14,
                    fontWeight: "normal",
                    // fontFamily: "Poppins",
                    color: "#6B7280",
                    margin: 0,
                  }}
                />
              </View>
              <Typography
                text={"processing"}
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  borderRadius: 15,
                  color: "#92400E",
                  margin: 0,
                  backgroundColor: "#FEF3C7",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
              />
            </View>
          </View>
          <View
            style={{
              $$css: true,
              _: "p-3 bg-white rounded-lg",
            }}
          >
            <Typography
              text={"Payout Information"}
              style={{
                fontSize: 16,
                fontWeight: "bold",
                // fontFamily: "Poppins",
                color: "#000000",
                margin: 0,
              }}
            />
            <View
              style={{
                $$css: true,
                _: "d-flex flex-row gap-2 items-center justify-between bg-gray-50 py-2 my-2 px-2 rounded-lg border-gray-100 border",
              }}
            >
              <IconBlock
                icon={{
                  serviceType: "FontAwesome",
                  iconName: "bank",
                  size: 18,
                  color: "#9CA3AF",
                  noBorder: true,
                  labelComponent: (
                    <View
                      style={{
                        $$css: true,
                        _: "flex-column m-2",
                      }}
                    >
                      <Typography
                        text={"HDFC Bank"}
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          // fontFamily: "Poppins",
                          color: "#000000",
                          margin: 0,
                        }}
                      />
                      <Typography
                        text={"Account Number: ....890"}
                        style={{
                          fontSize: 14,
                          fontWeight: "normal",
                          // fontFamily: "Poppins",
                          color: "#6B7280",
                          margin: 0,
                        }}
                      />
                    </View>
                  ),
                }}
              />
            </View>
            <View
              style={{
                $$css: true,
                _: "d-flex flex-row gap-2 items-center justify-between bg-gray-50 py-2 my-2 px-2 rounded-lg border-gray-100 border",
              }}
            >
              <IconBlock
                icon={{
                  serviceType: "AntDesign",
                  iconName: "qrcode",
                  size: 18,
                  color: "#9CA3AF",
                  noBorder: true,
                  labelComponent: (
                    <View
                      style={{
                        $$css: true,
                        _: "flex-column m-2",
                      }}
                    >
                      <Typography
                        text={"UPI"}
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          // fontFamily: "Poppins",
                          color: "#000000",
                          margin: 0,
                        }}
                      />
                      <Typography
                        text={"user@upi"}
                        style={{
                          fontSize: 14,
                          fontWeight: "normal",
                          // fontFamily: "Poppins",
                          color: "#6B7280",
                          margin: 0,
                        }}
                      />
                    </View>
                  ),
                }}
              />
            </View>
            <Button
              title={"Request Payout"}
              buttonColor="#4F46E5"
              borderRadius={8}
              borderColor="#D1D5DB"
              style={{ width: "100%", marginTop: 10 }}
              textColor="#FFFFFF"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF",
    padding: 16,
  },
});
export default ProfilePage;
