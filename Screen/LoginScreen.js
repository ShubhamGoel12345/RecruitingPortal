import React, { useState } from "react";
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Loader from "./Components/loader";

import { Requests } from "../utils/request";

const LoginScreen = (props) => {
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState("");

  const handleSubmitPress = async () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    setLoading(true);
    let auth = {
      username: userEmail,
      password: userPassword
    };

    Requests.get("/signin", {}, auth)
      .then(async (res) => {
        setLoading(false)
        let user = res.data.message;

        await AsyncStorage.setItem('token', res.config.headers.Authorization);
        await AsyncStorage.setItem('userType', user.type_type);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        if(user.type_type !== 'Employee') {
          props.navigation.navigate("EmployeeListScreen");
        } else {
          props.navigation.navigate("EmployeeProfileScreen", user);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.log(error);
        setErrortext("Please check your email id or password");
        console.log("Please check your email id or password");
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ marginLeft: 35, marginTop: 20 }}>
              <Text style={styles.titleText}>
                {"Recruiting"}
                {"\n"}
                {"Portal"}
              </Text>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Email"
                placeholderTextColor="#797979"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#797979"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate("RegisterScreen")}
            >
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 50,
    color: "#5c5c5c",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 30,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#2441d2",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "gray",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 60,
    borderColor: 'gray',
    borderWidth: 1
  },
  registerTextStyle: {
    color: "#3964e5",
    textAlign: "center",
    fontSize: 14,
  },
  errorTextStyle: {
    color: "red",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
  },
});
