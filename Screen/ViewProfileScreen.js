/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';

//Import all required component
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Avatar } from 'react-native-elements';

const ViewProfileScreen = props => {
  let data = props.navigation.state.params;

  let [userFirstName] = useState(data.firstName || '');
  let [userLastName] = useState(data.lastName || '');
  let [userEmail] = useState(data.emailAddress || '');
  let [userMobile] = useState(data.mobileNumber || '');
  let [userSkills] = useState(data.skills || []);

  const viewProfile = () => {
    return(
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center' }}>
          <Avatar containerStyle={ {marginTop: 40 }}
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
              {userSkills.join(',')}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }

  const showProfile = () => {
      return viewProfile();
  }

  return showProfile();
};
export default ViewProfileScreen;

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
    color: 'black',
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