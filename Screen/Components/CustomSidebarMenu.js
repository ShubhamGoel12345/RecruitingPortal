/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from "react";

//Import all required component
import { View, StyleSheet, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const CustomSidebarMenu = (props) => {
  global.currentScreenIndex = 'HomeScreen';
  let items = [
    {
      navOptionName: "Profile",
      screenToNavigate: "HomeScreen",
    },
    {
      navOptionName: "Logout",
      screenToNavigate: "logout",
    },
  ];

  const handleClick = (index, screenToNavigate) => {
    if (screenToNavigate == "logout") {
      props.navigation.toggleDrawer();
      Alert.alert(
        "Logout",
        "Are you sure? You want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return null;
            },
          },
          {
            text: "Confirm",
            onPress: () => {
              AsyncStorage.clear();
              props.navigation.navigate("Auth");
              console.log("logout");
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      props.navigation.navigate(screenToNavigate);
    }
  };
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: "#307ecc" }}>
            {"About".charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>Welcome</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />
      <View style={{ width: "100%", flex: 1 }}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              color: "white",
              backgroundColor: "#eee",
            }}
            key={key}
            onStartShouldSetResponder={() =>
              handleClick(key, item.screenToNavigate)
            }
          >
            <Text
              style={{
                fontSize: 20,
                color:
                  global.currentScreenIndex === item.screenToNavigate
                    ? "#2441d2"
                    : "#5f646d",
              }}
            >
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    paddingTop: 40,
    color: "#2441d2",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 15,
    textAlign: "center",
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "#4d4d4d",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
    marginBottom: 10,
  },
});
export default CustomSidebarMenu;
