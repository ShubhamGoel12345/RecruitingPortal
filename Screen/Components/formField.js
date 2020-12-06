
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export const createField = (field, defaultValue, onChange) => {

  console.log(defaultValue)
  switch (field.type) {
    case "text-box":
      return (
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserName => onChange(field.key, UserName)}
            underlineColorAndroid="#FFFFFF"
            placeholder={`Enter  ${field.name}`}
            placeholderTextColor="#F6F6F7"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() => { }}
            blurOnSubmit={false}
          />
        </View>

      )
    case "select":
      return (
        <View style={styles.SectionStyle}>
          <DropDownPicker
            items={field.dropDownList}
            multiple={true}
            style={{ backgroundColor: '#fafafa' }}
            defaultValue={defaultValue[field.key]?.value}
            containerStyle={{ width: 300, height: 40 }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => onChange(field.key, item.value)}
          />
        </View>
      )
    case "multi-select":
      return (
        <View style={styles.SectionStyle}>
          <DropDownPicker
            items={field.dropDownList}
            multiple={true}
            multipleText="%d items have been selected."
            min={0}
            max={10}
            // defaultValue={[{label: 'UK', value: 'uk'}]}
            containerStyle={{ height: 40 }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            onChangeItem={item => onChange(field.key, item)
          }
          />
        </View>
      )
    default:
      throw new Error("Invalid field type")
  }
}

export const styles = StyleSheet.create({
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