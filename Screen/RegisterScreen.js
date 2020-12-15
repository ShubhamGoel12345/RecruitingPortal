import React, { useState } from "react";
import { Requests } from "../utils/request";

import _ from "lodash";

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
import { RegistrationModalRecord } from "./state/registrationRecordType";
import Loader from "./Components/loader";

const RegisterScreen = (props) => {
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState("");
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  let [userPayload, setUserPayload] = useState({});

  const onChange = (key, data) => {
    let payload = Object.assign({}, userPayload);
    payload[key] = {
      value: data,
    };
    setUserPayload(payload);
  };

  const validateForm = () => {
    let anyError = false
    RegistrationModalRecord.fields.forEach((field) => {
      if (field.isRequired && (userPayload[field.key]?.value === undefined || userPayload[field.key]?.value === null)) {
        anyError = true
      }
    });
    return anyError
  }

  const handleSubmitButton = () => {
    if (validateForm()) {
      alert("Please fill required field");
      console.log("invalid form")
      return
    }
    const payload = _.mapValues(userPayload, (v) => v && v.value);
    payload['skills'] = [];
    payload['companyName'] = 'company';

    console.log(payload);

    setErrortext("");
    setLoading(true);
    Requests.post("/users", payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.status === 200) {
          setIsRegistraionSuccess(true);
          console.log("Registration Successful. Please Login to proceed");
        } else {
          setErrortext("Registration Unsuccessful");
        }
      })
      .catch((error) => {
        setLoading(false);
        setErrortext("Registration Failed");
        console.error(error);
      });
  };

  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <Text style={styles.successTextStyle}>{"Registration"} {"Successful"}</Text>
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center", marginTop: 40 }}>
        {/* <Text style={styles.formTextStyle}>{"Sign Up"}</Text> */}
        </View>
        <KeyboardAvoidingView enabled>
          {RegistrationModalRecord.fields.map((field) =>
            createField(field, onChange)
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
    backgroundColor: "#2441d2",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 60,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 40,
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
    marginTop: 120,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 40,
    textAlign: "center",
    fontSize: 32,
    color: "#5c5c5c",
  },
});
