import React from 'react';

import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

const Loader = props => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
     <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator animating={loading} size="large" color="#0000ff" />
    </View>
    </Modal>
  );
};
export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});