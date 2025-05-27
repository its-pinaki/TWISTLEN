import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

const Footer = ({
  sections = [
    { title: "Company", items: ["About", "Careers", "Press"] },
    { title: "Products", items: ["Courses", "Templates", "Coaching"] },
    { title: "Resources", items: ["Blog", "Case Studies", "Help Center"] },
  ],
  connectTitle = "Connect",
  newsletterText = "Subscribe to our newsletter",
  emailPlaceholder = "Your email",
  subscribeText = "Subscribe",
  copyrightText = "© 2025 All rights reserved.",
  backgroundColor = "bg-gray-900",
  padding = "px-4 py-6",
  columnWidth = "w-1/2 md:w-1/4",
  connectWidth = "w-full md:w-1/4",
  titleStyle = "text-white font-bold mb-2",
  itemStyle = "text-gray-400 text-sm",
  newsletterTextStyle = "text-gray-400 text-sm mb-2",
  inputStyle = "bg-white rounded-l px-2 py-1 w-2/3",
  buttonStyle = "bg-blue-600 px-3 py-1 rounded-r",
  buttonTextStyle = "text-white text-sm",
  copyrightStyle = "text-gray-500 text-xs text-center mt-4",
}) => {
  return (
    <View
      style={{
        $$css: true,
        _: `${backgroundColor} ${padding}`,
      }}
    >
      <View
        style={{
          $$css: true,
          _: `flex-row flex-wrap justify-between`,
        }}
      >
        {/* Column Sections */}
        {sections.map((section, idx) => (
          <View
            key={idx}
            style={{
              $$css: true,
              _: `mb-4 ${columnWidth}`,
            }}
          >
            <Text
              style={{
                $$css: true,
                _: titleStyle,
              }}
            >
              {section.title}
            </Text>
            {section.items.map((item) => (
              <Text
                key={item}
                style={{
                  $$css: true,
                  _: itemStyle,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        ))}

        {/* Newsletter Section */}
        <View
          style={{
            $$css: true,
            _: `mb-4 ${connectWidth}`,
          }}
        >
          <Text
            style={{
              $$css: true,
              _: titleStyle,
            }}
          >
            {connectTitle}
          </Text>
          <Text
            style={{
              $$css: true,
              _: newsletterTextStyle,
            }}
          >
            {newsletterText}
          </Text>
          <View
            style={{
              $$css: true,
              _: `flex-row items-center`,
            }}
          >
            <TextInput
              placeholder={emailPlaceholder}
              placeholderTextColor="#ccc"
              style={{
                $$css: true,
                _: inputStyle,
              }}
            />
            <TouchableOpacity
              style={{
                $$css: true,
                _: buttonStyle,
              }}
            >
              <Text
                style={{
                  $$css: true,
                  _: buttonTextStyle,
                }}
              >
                {subscribeText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text
        style={{
          $$css: true,
          _: copyrightStyle,
        }}
      >
        {copyrightText}
      </Text>
    </View>
  );
};

export default Footer;