import { StyleSheet } from "react-native";


const CustomModalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: "100%",
        width: "100%",
        
      },
      modalContentWrapper: {
        width: "90%",
        maxHeight: "60%", // Adjust as needed
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden', // Ensure the content does not overflow the modal container
      },
      modalContent: {
         padding: 20,
      },
      modalContainerclose: {
        alignSelf: 'center',
        backgroundColor: '#ffcd4e',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 20,
        marginBottom: 10,
      },
});


export default CustomModalStyles;