import React, { useState } from 'react';
import CardView from 'react-native-cardview'

//Import all required component
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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';
import { Requests } from "../utils/request";

const EmployeeListScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(true);
  let [errortext, setErrortext] = useState('');
  let [data, setData] = useState([]);

  Requests.get("/employees", {})
    .then(async (res) => {
      setLoading(false);
      setData(res.data);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error)
    }
  );

  const click = (index) => {
    props.navigation.navigate(
      'ViewProfileScreen',
      data[index]
    )
  }

  const cardView = (index) => {
    if(data[index]) {
    return (
      <TouchableOpacity
      onPress={() => { click(index) }}>
      <CardView
          cardElevation={5}
          cardMaxElevation={5}
          cornerRadius={12}
          margin={10}
          paddingLeft={10}
          paddingRight={10}
          paddingVertical={20}>
                    <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
          <Text>
              Name: {data[index].firstName} {data[index].lastName}
          </Text>
          <Text>
              Skills: {data[index].skills.join(',')}
          </Text>
          <Text>
              Email: {data[index].emailAddress}
          </Text>
          <Text>
              Phone: {data[index].mobileNumber}
          </Text>
</CardView>
</TouchableOpacity  >
    )} else {
      return;
    }
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          {data.map((g, index) => { return cardView(index)})}
            </View>
            </ScrollView>
            </View>
  );
};
export default EmployeeListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});