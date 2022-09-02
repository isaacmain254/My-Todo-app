import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

const ModalView = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={modelStyle.centeredView}>
      <Modal
        animationType="fade"
        visible={!modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View>
          <View style={modelStyle.modalView}>
            <Pressable style={modelStyle.pressable}>
              <Text style={modelStyle.text}>Delete all</Text>
            </Pressable>
            <Pressable style={modelStyle.pressable}>
              <Text style={modelStyle.text}>Select</Text>
            </Pressable>
            <Pressable style={modelStyle.pressable}>
              <Text style={modelStyle.text}>Exit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modelStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    display: 'flex',
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    marginRight: 5,
    marginTop: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  pressable: {
    padding: 15,
    width: '100%',
  },
  text: {
    fontSize: 17,
    color: '#101010',
  },
});

export default ModalView;
