/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
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
import Loader from './Components/loader';

const EmployeeProfileScreen = props => {
  let data = props.navigation.state.params;
  let [userFirstName, setUserFirstName] = useState(data.firstName || '');
  let [userLastName, setUserLastName] = useState(data.lastName || '');
  let [userEmail, setUserEmail] = useState(data.emailAddress || '');
  let [userMobile, setUserMobile] = useState(data.mobileNumber || '');
  let [userSkills, setUserSkills] = useState(data.skils || []);
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isUpdateSuccess, setIsRegistraionSuccess] = useState(false);
  let [viewMode, setViewMode] = useState(true);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!userFirstName) {
      alert('Please fill Name');
      return;
		}
		if (!userLastName) {
      alert('Please fill Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userMobile) {
      alert('Please fill Age');
      return;
    }

    toggleViewMode();
  };

  const toggleViewMode = () => {
    setViewMode(!viewMode);
  }

  const viewProfile = () => {
    return(
      <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../Image/aboutreact.png')}
              style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />
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
      <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
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
    if(viewMode) {
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
    color: 'white',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: 16
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
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