/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';

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
} from 'react-native';
import { Requests } from '../utils/request';
import Loader from './Components/loader';
import { Avatar, Accessory } from 'react-native-elements';


let stop = true;

const EmployeeProfileScreen = props => {
  let data = {}

  let [userFirstName, setUserFirstName] = useState(data.first_name || '');
  let [userLastName, setUserLastName] = useState(data.last_name || '');
  let [userEmail, setUserEmail] = useState(data.email_address || '');
  let [userMobile, setUserMobile] = useState(data.mobile_number || '');
  let [userSkills, setUserSkills] = useState(data.skills || []);
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isUpdateSuccess, setIsRegistraionSuccess] = useState(false);
  let [viewMode, setViewMode] = useState(true);

  if (stop) {
    AsyncStorage.getItem('user').then((res) => {
      stop = false;
      data = JSON.parse(res);
      setUserFirstName(data.first_name);
      setUserLastName(data.last_name);
      setUserEmail(data.email_address);
      setUserMobile(data.mobile_number);
      setUserSkills(data.skills);
    });
  }

  const handleSubmitButton = () => {
    setErrortext('');
    setLoading(true);
    if (!userFirstName) {
      alert('Please fill First Name');
      return;
    }
    if (!userLastName) {
      alert('Please fill Last Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userMobile) {
      alert('Please fill Mobile Number');
      return;
    }

    Requests.put("/employees/id", {
      firstName: userFirstName,
      lastName: userLastName
    }).then(async (res) => {
      let user = res.data.message;
      console.log(user);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setLoading(false);
      setUserFirstName(user.first_name);
      setUserLastName(user.last_name);
      toggleViewMode();
    })
      .catch(error => {
        setLoading(false)
        console.log(error)
      })
  };

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  }


  // containerStyle ={{marginLeft: 350, marginTop: 5}}
  const viewProfile = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Avatar containerStyle={{ marginLeft: 325, marginTop: 15 }}
          rounded
          onPress={() => console.log("Works!")}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
        />
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center' }}>
            <Avatar containerStyle={{ marginLeft: 10, marginTop: 40 }}
              size={200}
              rounded
              onPress={() => console.log("Works!")}
              source={require('../Image/aboutreact.png')}>

            </Avatar>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.ViewSectionStyle}>
              <Text style={styles.viewStyle}>
                First Name:
              </Text>

              <Text style={styles.viewStyle}>
                {userFirstName}
              </Text>
            </View>
            <View style={styles.ViewSectionStyle}>
              <Text style={styles.viewStyle}>
                Last Name:
              </Text>

              <Text style={styles.viewStyle}>
                {userLastName}
              </Text>
            </View>
            <View style={styles.ViewSectionStyle}>
              <Text style={styles.viewStyle}>
                Email Address:
              </Text>

              <Text style={styles.viewStyle}>
                {userEmail}
              </Text>
            </View>
            <View style={styles.ViewSectionStyle}>
              <Text style={styles.viewStyle}>
                Mobile Number:
              </Text>

              <Text style={styles.viewStyle}>
                {userMobile}
              </Text>
            </View>
            <View style={styles.ViewSectionStyle}>
              <Text style={styles.viewStyle}>
                Skills:
              </Text>

              <Text style={styles.viewStyle}>
                {userSkills}
              </Text>
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={toggleViewMode}>
              <Text style={styles.buttonTextStyle}>Edit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }

  const editProfile = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center' }}>
            <Avatar containerStyle={{ marginLeft: 10, marginTop: 60 }}
              size={200}
              rounded
              onPress={() => console.log("Works!")}
              source={require('../Image/aboutreact.png')}></Avatar>
          </View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userFirstName}
                onChangeText={UserFirstName => setUserFirstName(UserFirstName)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter First Name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userLastName}
                onChangeText={UserLastName => setUserLastName(UserLastName)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Last Name"
                placeholderTextColor="#F6F6F7"
                autoCapitalize="sentences"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userEmail}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#F6F6F7"
                placeholder="Enter Email"
                placeholderTextColor="#F6F6F7"
                keyboardType="email-address"
                returnKeyType="next"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={userMobile}
                onChangeText={UserMobile => setUserMobile(UserMobile)}
                underlineColorAndroid="#F6F6F7"
                placeholder="Enter Mobile"
                placeholderTextColor="#F6F6F7"
                keyboardType="numeric"
                blurOnSubmit={false}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>Update</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }

  const showProfile = () => {
    if (viewMode) {
      return viewProfile();
    } else {
      return editProfile();
    }
  }

  return showProfile();
};
export default EmployeeProfileScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
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
    flexDirection: 'row',
  },
  viewStyle: {
    flex: 1,
    color: 'gray',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16
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
    color: '#FFFFFF',
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
    borderColor: '#d8d8d8',
    borderWidth: 1
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});