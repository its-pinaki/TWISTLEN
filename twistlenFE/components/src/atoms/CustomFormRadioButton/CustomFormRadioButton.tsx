import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import FormCssstyles from '../CommonCss/FormCss.styles';

const CustomFormRadioButton = ({ options, selectedRadioOption, onValueChange, title }) => {
  return (
    <View 
    // style={FormCssstyles.container}
    >
      <Text style={FormCssstyles.Boxname}>{title}</Text>

      <RadioButton.Group onValueChange={onValueChange} value={selectedRadioOption}>
        {options.map((option) => (
          <View key={option.id} 
        //   style={FormCssstyles.radioButtonContainer}
          >
            <RadioButton.Item
              label={option.label}
              value={option.value}
              color="#ffd100"
              uncheckedColor="gray"
            //   style={FormCssstyles.radioButton}
            />
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};

export default CustomFormRadioButton;
