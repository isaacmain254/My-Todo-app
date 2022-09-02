import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import ModalView from '../components/ModalView';

const HomeScreen = ({navigation}) => {
  const [showModel, setShowModel] = useState(false);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          {showModel && <ModalView />}
          <Icon
            name="more-vertical"
            color="#fff"
            size={23}
            onPress={() => {
              setShowModel(!showModel);
            }}
          />
        </View>
      ),
    });
  });
  const {getItem} = useAsyncStorage('todo');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComponent, setShowComponent] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getTodoList() {
    getItem()
      .then(todoJSON => {
        const todo = todoJSON ? JSON.parse(todoJSON) : [];
        setItems(todo);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        Toast.show({
          type: 'error',
          text1: 'An error occurred',
          position: 'top',
        });
      });
  }
  function renderCard({item}) {
    return (
      <View style={homeStyles.cardView}>
        <TouchableOpacity style={homeStyles.cardItem}>
          <Text
            style={homeStyles.todoText}
            onPress={() => navigation.navigate('Add Todo')}>
            {item.title}
          </Text>
          {showComponent && (
            <View style={homeStyles.delete}>
              <Text style={homeStyles.deleteText}>Delete</Text>
            </View>
          )}
          <Icon
            name="more-vertical"
            color="#111"
            size={23}
            style={homeStyles.cardIcon}
            onPress={() => {
              setShowComponent(true);
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getTodoList);
    return unsubscribe;
  }, [getTodoList, navigation]);

  return (
    <SafeAreaView style={homeStyles.safeAreastyle}>
      <View style={homeStyles.mainView}>
        <FlatList
          refreshing={loading}
          onRefresh={getTodoList}
          data={items}
          renderItem={renderCard}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={homeStyles.addIcon}>
        <Icon
          name="plus"
          size={30}
          color="#fff"
          onPress={() => navigation.navigate('Add Todo')}
        />
      </View>
    </SafeAreaView>
  );
};
const homeStyles = StyleSheet.create({
  // HomeScreen style
  safeAreastyle: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
  addIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#1e90ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 50,
    marginRight: 5,
    marginBottom: 5,
  },
  // renderCard styles
  cardView: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 5,
    position: 'relative',
    zIndex: 10,
  },
  cardItem: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: '#228bec',
    height: 55,
    boxSizing: 'border-box',
  },
  todoText: {
    flex: 7,
    fontSize: 16,
    color: '#1e1e1e',
    margin: 4,
    position: 'relative',
    zIndex: 10,
  },
  cardIcon: {
    display: 'flex',
    alignSelf: 'center',
  },
  delete: {
    display: 'flex',
    position: 'absolute',
    zIndex: 90,
    backgroundColor: '#1e1e1e',
    width: '30%',
    top: 5,
    right: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 17,
    padding: 7,
  },
});
export default HomeScreen;
