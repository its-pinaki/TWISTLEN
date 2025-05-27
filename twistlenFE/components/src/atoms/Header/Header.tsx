import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = ({
  logo = "Logo",
  logoStyle = "text-lg font-bold text-black",
  navItems = ["Products", "Solutions", "Resources", "Pricing"],
  navItemStyle = "text-gray-700 text-sm hidden sm:flex",
  ctaText = "Start Free",
  ctaStyle = "bg-blue-600 px-3 py-1 rounded",
  ctaTextStyle = "text-white text-sm",
  menuIconColor = "black",
  menuIconSize = 24,
  backgroundColor = "bg-white",
  padding = "px-4 py-3",
  shadow = "shadow",
  mobileMenuStyle = "mt-3",
  mobileNavItemStyle = "text-gray-700 py-1",
  mobileCtaStyle = "bg-blue-600 px-3 py-2 rounded mt-2",
  mobileCtaTextStyle = "text-white text-sm text-center",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const isSmallScreen = screenWidth < 640; // Tailwind 'sm' breakpoint (~640px)

  return (
    <View
      style={{
        $$css: true,
        _: `${backgroundColor} ${padding} ${shadow}`,
      }}
    >
      <View
        style={{
          $$css: true,
          _: `flex-row justify-between items-center`,
        }}
      >
        {/* Logo */}
        <Text
          style={{
            $$css: true,
            _: logoStyle,
          }}
        >
          {logo}
        </Text>

        {/* Hamburger menu or inline nav */}
        {isSmallScreen ? (
          <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
            <Ionicons
              name={menuOpen ? "close" : "menu"}
              size={menuIconSize}
              color={menuIconColor}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={{
              $$css: true,
              _: `flex-row space-x-4`,
            }}
          >
            {navItems.map((item) => (
              <Text
                key={item}
                style={{
                  $$css: true,
                  _: navItemStyle,
                }}
              >
                {item}
              </Text>
            ))}
            <TouchableOpacity
              style={{
                $$css: true,
                _: ctaStyle,
              }}
            >
              <Text
                style={{
                  $$css: true,
                  _: ctaTextStyle,
                }}
              >
                {ctaText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Mobile Dropdown Menu */}
      {isSmallScreen && menuOpen && (
        <View
          style={{
            $$css: true,
            _: mobileMenuStyle,
          }}
        >
          {navItems.map((item) => (
            <Text
              key={item}
              style={{
                $$css: true,
                _: mobileNavItemStyle,
              }}
            >
              {item}
            </Text>
          ))}
          <TouchableOpacity
            style={{
              $$css: true,
              _: mobileCtaStyle,
            }}
          >
            <Text
              style={{
                $$css: true,
                _: mobileCtaTextStyle,
              }}
            >
              {ctaText}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Header;
