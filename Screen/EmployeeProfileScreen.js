import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Requests } from "../utils/request";
import Loader from "./Components/loader";
import { Avatar } from "react-native-elements";
import { EmployeeProfileViewRecord, EmployeeProfileEditRecord } from "./state/profileRecordType";
import { createField } from "./Components/formField";

const EmployeeProfileScreen = () => {
  let [userData, setUserData] = useState({});
  let [loading, setLoading] = useState(true);
  let [errortext, setErrortext] = useState("");
  let [viewMode, setViewMode] = useState(true);

  useEffect(() => {
    Requests.get("/getUser")
      .then((res) => {
        setLoading(false);
        setUserData(res.data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const onChange = (key, data) => {
    let payload = Object.assign({}, userData);
    payload[key] = data
    setUserData(payload);
  };

  const validateForm = () => {
    let anyError = false
    EmployeeProfileEditRecord.fields.forEach((field) => {
      if (userData[field.key] === undefined || userData[field.key] === null) {
        anyError = true
      }
    });
    return anyError
  }

  const handleSubmitButton = () => {
    setErrortext("");
    setLoading(true);

    if (validateForm()) {
      alert("Please fill required field");
      console.log("invalid form")
      return
    }
    Requests.put("/users/id", userData)
      .then(() => {
        setLoading(false);
        toggleViewMode();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  };


  const viewProfile = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: "center" }}>
            <Avatar
              containerStyle={{ marginLeft: 10, marginTop: 40 }}
              size={200}
              rounded
              source={require("../Image/aboutreact.png")}
            ></Avatar>
          </View>
          <KeyboardAvoidingView enabled>
            {EmployeeProfileViewRecord.fields.map((field) =>
              createField(field, () => { }, userData)
            )}
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={toggleViewMode}
            >
              <Text style={styles.buttonTextStyle}>Edit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  };

  const editProfile = () => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: "center" }}>
            <Avatar
              containerStyle={{ marginLeft: 10, marginTop: 60 }}
              size={200}
              rounded
              source={require("../Image/aboutreact.png")}
            ></Avatar>
          </View>
          <KeyboardAvoidingView enabled>
            {EmployeeProfileEditRecord.fields.map((field) =>
              createField(field, onChange, userData)
            )}
            {errortext != "" ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}
            >
              <Text style={styles.buttonTextStyle}>Update</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  };

  const showProfile = () => {
    if (viewMode) {
      return viewProfile();
    } else {
      return editProfile();
    }
  };

  return showProfile();
};
export default EmployeeProfileScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  ViewSectionStyle: {
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    flexDirection: "row",
  },
  viewStyle: {
    flex: 1,
    color: "gray",
    flexDirection: "column",
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16,
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
    marginTop: 120,
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
    height: 45,
    borderColor: "#d8d8d8",
    borderWidth: 1,
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
