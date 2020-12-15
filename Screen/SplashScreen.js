import React, { useState, useEffect } from "react";

//Import all required component
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const SplashScreen = (props) => {
  let [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.multiGet(["token", "userType"]).then((value) => {
        let nav = "Auth";
        if (value[0][1] !== null && value[1][1] !== null) {
          nav =
            value[1][1] === "Employee"
              ? "DrawerNavigationRoutesEmployee"
              : "DrawerNavigationRoutesEmployer";
        }
        return props.navigation.navigate(nav);
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#2441d2"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  activityIndicator: {
    alignItems: "center",
    height: 80,
  },
});
