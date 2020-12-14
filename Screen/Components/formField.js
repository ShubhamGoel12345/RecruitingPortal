
import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export function getLabel(field) {
  return (
    field.name + (field.isRequired ? " *" : "")
  )
}

export const createField = (field, onChange, defaultValue) => {

  const fieldKey = JSON.stringify(field)
  switch (field.type) {
    case "text-box":
      return (
        <View key={fieldKey} style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={UserName => onChange(field.key, UserName)}
            underlineColorAndroid="#FFFFFF"
            placeholder={`Enter ${getLabel(field)}`}
            placeholderTextColor="#797979"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() => { }}
            blurOnSubmit={false}
          />
        </View>

      )
    case "prefilled-text-box":
      return (
        <View key={fieldKey} style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            value={defaultValue[field.key]}
            onChangeText={UserName => onChange(field.key, UserName)}
            underlineColorAndroid="#FFFFFF"
            placeholder={`Enter ${getLabel(field)}`}
            placeholderTextColor="#797979"
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() => { }}
            blurOnSubmit={false}
          />
        </View>
      )
    case "view-field":
      return (
        <View key={fieldKey} style={styles.ViewSectionStyle}>
          <Text style={styles.viewStyle}>
            {field.name}
          </Text>
          <Text style={styles.viewStyle}>
            {field.isArray == true ? (defaultValue[field.key] || "").toString() : defaultValue[field.key]}
          </Text>
        </View>
      )
    case "select":
      return (
        <View key={fieldKey} style={styles.SectionStyle}>
          <DropDownPicker
            items={field.dropDownList}
            multiple={false}
            placeholder={`Select ${getLabel(field)}`}
            containerStyle={{ flex: 1, height: 45 }}
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
        <View key={fieldKey} style={styles.SectionStyle}>
          <DropDownPicker
            items={field.dropDownList}
            multiple={true}
            placeholder={`Select ${getLabel(field)}`}
            multipleText="%d items have been selected."
            defaultValue={defaultValue[field.key] || []}
            min={0}
            max={10}
            containerStyle={{ flex: 1, height: 45 }}
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
});