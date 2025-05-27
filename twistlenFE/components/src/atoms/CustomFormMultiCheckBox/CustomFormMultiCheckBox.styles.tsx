import { StyleSheet } from "react-native";



const CustomFormMultiCheckBoxStyles = StyleSheet.create ({
    container: {
        flex: 1,
        padding: 10,
      },
      header: {
        fontSize: 20,
        marginBottom: 10,
      },
      checkboxesContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
      },
      checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 5,
      },
      checkbox: {
        marginRight: 10,
      },
      label: {
        fontSize: 16,
      },
})



export default CustomFormMultiCheckBoxStyles;