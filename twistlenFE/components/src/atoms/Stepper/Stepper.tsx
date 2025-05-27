import React from "react";
import { View, Text, useWindowDimensions } from "react-native";

type StepperProps = {
  steps: string[];
  icons: React.ReactNode[]; // New prop for icons
  activeStep: number;
  activeColor: string;
  inactiveColor: string;
};

const Stepper: React.FC<StepperProps> = ({ steps, icons, activeStep, activeColor, inactiveColor }) => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  const fontSize = isSmallScreen ? 8 : 10;
  const stepperWidth = isSmallScreen ? 30 : 40;
  const stepperHeight = isSmallScreen ? 30 : 40;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 20, flexWrap: "wrap" }}>
      {steps.map((step, index) => (
        <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ alignItems: "center", marginHorizontal: 10 }}>
            <View
              style={{
                width: stepperWidth,
                height: stepperHeight,
                borderRadius: 25,
                backgroundColor: index === activeStep ? activeColor : inactiveColor,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3.5,
                elevation: 5,
              }}
            >
              {icons?.[index] || (
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: fontSize + 2 }}>{index + 1}</Text>
              )}
            </View>
            {!isSmallScreen && (
              <Text style={{ marginTop: 8, textAlign: "center", fontSize: fontSize, fontWeight: "600", color: "#555" }}>
                {step}
              </Text>
            )}
          </View>
          {index < steps.length - 1 && (
            <View
              style={{
                flex: 1,
                height: 2,
                backgroundColor: index < activeStep ? activeColor : inactiveColor,
                alignSelf: "center",
                marginHorizontal: 5,
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: index < activeStep ? activeColor : inactiveColor,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default Stepper;
