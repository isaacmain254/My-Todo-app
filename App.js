import 'react-native-gesture-handler';
/* eslint-disable react-native/no-inline-styles */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/screens/HomeScreen';
import AddTodoScreen from './src/screens/AddTodoScreen';
import {StatusBar, View} from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: '#1e90ff'},
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontSize: 17,
            },
            headerTitleAlign: 'center',
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'My Todo',
              // headerRight: () => (
              //   <Button
              //     title="Add Todo"
              //     onPress={() => navigation.navigate('Add Todo')}
              //   />
              // ),
            }}
          />
          <Stack.Screen name="Add Todo" component={AddTodoScreen} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </View>
  );
};

export default App;
