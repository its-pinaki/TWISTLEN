import { View, Text } from "react-native";
import React from "react";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import GenericTable from "../../atoms/GenericTable/GenericTable";

const OrderManager = () => {
  const columns = [
    { key: "orderid", title: "ID" },
    { key: "customer", title: "Customer", sortable: true },
    { key: "products", title: "Products", sortable: true },
    { key: "total", title: "Total" },
    { key: "status", title: "Status" },
    { key: "action", title: "Action" },
  ];

  const data = [
    {
      orderid: (
        <Typography
          text={"#ORD-1234-234e3"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      customer: (
        <>
          <Typography
            text={"pinaki piyush pattanaik"}
            style={{
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "",
              color: "#000000",
              margin: 0,
            }}
          />
          <Typography
            text={"pinaki.pattanaik11@gmail.com"}
            style={{
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "",
              color: "#6B7280",
              margin: 0,
            }}
          />
        </>
      ),
      products: (
        <View
          style={{
            $$css: true,
            _: "flex",
          }}
        >
          <Typography
            text={"IPhone 15 Pro Max"}
            style={{
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "",
              color: "#000000",
              margin: 0,
            }}
          />
          <Typography
            text={"Qty : 2"}
            style={{
              fontSize: 14,
              fontWeight: "bold",
              fontFamily: "",
              color: "#6B7280",
              margin: 0,
            }}
          />
        </View>
      ),
      total: (
        <Typography
          text={"$130.00"}
          style={{
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "",
            color: "#000000",
            margin: 0,
          }}
        />
      ),
      status: (
        <Typography
          text={"pending"}
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
  return (
    <View>
      {/* Header carddetails */}
      <View
        style={{
          $$css: true,
          _: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5",
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
              text={"Total Orders"}
              style={{
                fontSize: 16,
                fontWeight: "regular",
                fontFamily: "Poppins",
                color: "#6B7280",
                margin: 0,
              }}
            />
            <IconBlock
              icon={{
                serviceType: "MaterialIcons",
                iconName: "shopping-cart",
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
          <Typography
            text={"1284"}
            style={{
              fontSize: 24,
              fontWeight: "500",
              fontFamily: "",
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
                    fontFamily: "Poppins",
                    color: "#059669",
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
      </View>

      {/* Table details */}
      <GenericTable
        columns={columns}
        data={data}
        rowsPerPage={3}
        themeColor="#2563EB"
      />
    </View>
  );
};

export default OrderManager;
