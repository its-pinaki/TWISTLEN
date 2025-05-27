import { StyleSheet } from "react-native";

const CustomDropDownStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 12,
    // elevation: 3,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    maxHeight: 350,
    width: "100%",
  },
  searchIcon: {
    marginRight: 8,
    color: "#888",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 8,
    paddingBottom: 4,
  },
  badge: {
    flexDirection: "row",
    backgroundColor: "#222f3e",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    marginRight: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 14,
    marginRight: 6,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    borderRadius: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  selectedItem: {
    backgroundColor: "#c8d6e5",
  },
  noItemsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  noItemsText: {
    fontSize: 16,
    color: "#777",
    marginLeft: 8,
  },
  button1: {
    backgroundColor: "#222f3e",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText1: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});

export default CustomDropDownStyles;
