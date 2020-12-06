/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from "react";
import { Requests } from "../utils/request";

import _ from "lodash";

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createField } from "./Components/formField";
import { RegistrationModalRecord } from "./registrationRecordType";
import Loader from "./Components/loader";

import { DestructurePayload } from "../utils/commonUtil";

// {
//   "firstName": "Manu",
//   "lastName": "Jindal",
//   "emailAddress": "manujindal@gmail.com",
//   "password": "qwerty1234ss",
//   "mobileNumber": "9034340299",
//   "type": "Employee",
//   "skills": ["java", "ruby"]
// }

const RegisterScreen = (props) => {
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState("");
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  let [userPayload, setUserPayload] = useState({});

  const onChange = (key, data) => {
    let payload = Object.assign({}, userPayload);
    console.log("okoko", payload);
    payload[key] = {
      value: data,
    };
    setUserPayload(payload);
    console.log(key);
    console.log(data);
  };

  const validateForm = () => {
    let anyError = false
    console.log(userPayload)
    RegistrationModalRecord.fields.forEach((field) => {
      if (field.isRequired && (userPayload[field.key]?.value === undefined || userPayload[field.key]?.value === null)) {
        alert("Please fill " + field.name);
        anyError = true
        return false
      }
    });
    console.log("anyError", anyError)
    return anyError
  }

  const handleSubmitButton = () => {
    if (validateForm()) {
      return
    }
    // console.log(userPayload);

    const payload = _.mapValues(userPayload, (v) => v && v.value);

    // console.log(payload);


    setErrortext("");
    setLoading(true);
    Requests.post("/users", payload)
      .then((res) => {
        console.log(responseJson);
        setLoading(false);
        if (res.status === 200) {
          setIsRegistraionSuccess(true);
          console.log("Registration Successful. Please Login to proceed");
        } else {
          setErrortext("Registration Unsuccessful");
        }
      })
      .catch((error) => {
        // Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#307ecc",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../Image/success.png")}
          style={{ height: 150, resizeMode: "contain", alignSelf: "center" }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#307ecc" }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../Image/aboutreact.png")}
            style={{
              width: "50%",
              height: 100,
              resizeMode: "contain",
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          {RegistrationModalRecord.fields.map((field) =>
            createField(field, userPayload, onChange)
          )}
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "white",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
