import React from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import CustomModalStyles from './CustomModal.styles';
// Define the props interface
interface CustomFormModalProps {
  modalVisible: boolean;
  transparent: boolean;
  closeModal: () => void;
  modalContent: () => React.ReactNode;
}

const CustomModal: React.FC<CustomFormModalProps> = ({
  modalVisible,
  closeModal,
  modalContent,
  transparent
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={CustomModalStyles.modalContainer}>
        <TouchableOpacity style={CustomModalStyles.modalContainerclose} onPress={closeModal}>
          <Text>X</Text>
        </TouchableOpacity>
        <View style={CustomModalStyles.modalContentWrapper}>
          <ScrollView contentContainerStyle={CustomModalStyles.modalContent} showsVerticalScrollIndicator={false}>
           
            {modalContent && modalContent()}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};


export default CustomModal;
