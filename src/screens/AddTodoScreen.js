import React from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

export default function AddTodoScreen({navigation}, props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Save" />,
      headerLeft: () => (
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      ),
    });
  });
  const {getItem, setItem} = useAsyncStorage('todo');
  function newTask(values) {
    if (!values.title) {
      Toast.show({
        type: 'error',
        text1: 'Title is required',
        position: 'top',
      });
      return;
    }
    //get todo  array from storage
    getItem()
      .then(todoJSON => {
        let todo = todoJSON ? JSON.parse(todoJSON) : [];
        //add a new item to the list
        todo.push({
          id: uuid.v4(),
          title: values.title,
        });
        //set item in storage again
        setItem(JSON.stringify(todo))
          .then(() => {
            //navigate back to home screen
            navigation.goBack();
          })
          .catch(err => {
            console.error(err);
            Toast.show({
              type: 'error',
              text1: 'An error occured and a new item could not be saved',
              position: 'top',
            });
          });
      })
      .catch(err => {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'An error occurred and a new item could not be saved',
          position: 'bottom',
        });
      });
  }
  return (
    <View>
      <Formik initialValues={{title: ''}} onSubmit={newTask}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <Text style={addTodoStyle.heading}>New Todo Item</Text>
            <TextInput
              placeholder="Example: cook, clean, etc ..."
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              multiline
              style={addTodoStyle.textInput}
            />
            <Button title="Add" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const addTodoStyle = StyleSheet.create({
  textInput: {
    borderBottomColor: '000',
    borderBottomWidth: 1,
    display: 'flex',
    marginBottom: 13,
    color: '1e1e1e',
    fontSize: 17,
  },
  heading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#1e90fe',
    marginBottom: 5,
  },
});
