import React, { useState } from 'react';
import CardView from 'react-native-cardview';
import DropDownPicker from 'react-native-dropdown-picker';

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
import Loader from './Components/loader';
import { Requests } from "../utils/request";
import { Avatar, Accessory } from 'react-native-elements';


const EmployeeListScreen = props => {
  let [selectedSkills, setSkills] = useState('');
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
    if (data[index]) {
      return (
        <TouchableOpacity key={index}
          onPress={() => { click(index) }}>
          <CardView
            cardElevation={5}
            cardMaxElevation={5}
            cornerRadius={12}
            margin={10}
            paddingLeft={10}
            paddingRight={10}
            paddingVertical={20}>
            <Avatar containerStyle={{ marginLeft: 10, marginBottom: 10 }}
              size={100}
              rounded
              onPress={() => console.log("Works!")}
              source={require('../Image/aboutreact.png')}>

            </Avatar>
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
      )
    } else {
      return;
    }
  }

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <DropDownPicker
          items={[
            { label: 'JAVA', value: 'java' },
            { label: 'PYTHON', value: 'python' },
            { label: 'C++', value: 'cpp' },
            { label: 'RUBY', value: 'ruby' },
          ]}
          multiple={true}
          placeholder={"Select"}
          multipleText="%d items have been selected."
          defaultValue={[]}
          min={0}
          max={10}
          containerStyle={{ marginTop:10, height: 55, width: 200 }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          onChangeItem={item => { }}
        />
        <View style={{ marginTop: 100 }}>
          {data.map((g, index) => { return cardView(index) })}
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
    backgroundColor: '#fff',
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