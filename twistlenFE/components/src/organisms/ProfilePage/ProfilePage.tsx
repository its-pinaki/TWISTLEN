import { View, Text } from "react-native";
import React from "react";
import TabComponent from "../../atoms/TabComponent/TabComponent";
import Button from "../../atoms/Button/Button";
import ProfileContainer from "../../molecules/ProfileContainer/ProfileContainer";
import Typography from "../../atoms/Typography/Typography";
import IconBlock from "../../atoms/IconBlock/IconBlock";
import ActionInput from "../../molecules/ActionInput/ActionInput";
import CustomCardContainer from "../../atoms/CustomCardContainer/CustomCardContainer";
import ScrollableContainer from "../../molecules/ScrollableContainer/ScrollableContainer";
import ProductContainer from "../../molecules/ProductContainer/ProductContainer";

const ProfilePage = () => {
  const AccountComponents = () => {
    return (
      <View>
        <View
          style={{
            backgroundColor: "#ffff",
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <Typography
            text="Change Password"
            fontWeight={"bold"}
            fontSize={18}
          />
          <IconBlock
            icon={{
              serviceType: "MaterialIcons",
              iconName: "password",
              size: 15,
              color: "black",
              width: 40,
              height: 30,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#ffff",
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <Typography text="Logout" fontWeight={"bold"} fontSize={18} />
          <IconBlock
            icon={{
              serviceType: "MaterialIcons",
              iconName: "logout",
              size: 15,
              color: "black",
              width: 40,
              height: 30,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: "#ffff",
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Typography text="Delete Account" fontWeight={"bold"} fontSize={18} />
          <IconBlock
            icon={{
              serviceType: "MaterialIcons",
              iconName: "delete-outline",
              size: 15,
              color: "black",
              width: 40,
              height: 30,
            }}
          />
        </View>
      </View>
    );
  };
  const WalletComponents = () => {
    const TransactionComponents = () => {
      const transactionData = [
        {
          subtitle: "Transaction Details",
          keyValueList: [
            { key: "Transaction ID", value: "TXN12345678" },
            { key: "Amount", value: "$250.00" },
            { key: "Status", value: "Completed", data: ["Success"] },
            { key: "Date", value: "March 8, 2025" },
            { key: "Payment Method", value: "Credit Card (**** 1234)" },
            { key: "Merchant", value: "Amazon" },
          ],
          isSeparate: true,
        },
        {
          footerlinkLabel: "View Invoice",
          onfooterPress: () => alert("Invoice Opened"),
        },
      ];
      return (
        <View>
          <CustomCardContainer sections={transactionData} />
        </View>
      );
    };
    const WithdrawComponents = () => {
      return (
        <View>
          <ActionInput />
        </View>
      );
    };
    const walletTabs: { [key: string]: React.ReactNode } = {
      Transaction: <TransactionComponents />,
      Withdraw: <WithdrawComponents />,
    };
    return (
      <View>
        <TabComponent tabs={walletTabs} />
      </View>
    );
  };
  const RecommendationsComponents = () => {
    return (
      <View>
        <Typography
          text="Ghost Town Series"
          fontWeight={"bold"}
          fontSize={18}
        />
        <ScrollableContainer
          data={["A", "B", "C", "A", "B", "C", "A", "B", "C"]}
          renderItem={({ item }) => <ProductContainer />}
          horizontal
        />
      </View>
    );
  };
  const tabs: { [key: string]: React.ReactNode } = {
    Account: <AccountComponents />,
    Wallet: <WalletComponents />,
    Recommendations: <RecommendationsComponents />,
  };
  return (
    <View>
      <ProfileContainer />
      <TabComponent tabs={tabs} />
    </View>
  );
};

export default ProfilePage;
