import React, {useState} from 'react';
import {View, Modal, Pressable, Text} from 'react-native';

const Delete = () => {
  const [deleteModal, setDeleteModel] = useState(false);
  return (
    <View>
      <Modal
        animationType="fade"
        visible={!deleteModal}
        transparent={true}
        onRequestClose={() => {
          setDeleteModel(deleteModal);
        }}>
        <View>
          <View>
            <Pressable>
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Delete;
