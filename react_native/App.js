/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import {Platform, Text, View, TextInput, ListView, Button, Alert} from 'react-native';
import firebaseApp from './firebase_lib/firebase.js';
import styles from './styles/styles.js';


export default class App extends Component<Props> {

	constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      newTaskValue: ''
    };
    this.itemsRef = this.getRef().child('items');
  }

  /*
  * get database reference object from firebase
  */
  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {

    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

console.log('HEy in listenForItems',items.length)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items),
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }


  render() {
    return (
      <View style={styles.container}>
      
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({newTaskValue: text})}
        placeholder= "enter new task"
        value={this.state.newTaskValue}
        />
		<Button
		  onPress={this._addTask.bind(this)}
		  title="Click to Add task"
		  color="blue"
		/>
        
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={[{flex: 1}]}
          />
      </View>

    );
    ///
  }

  _addTask(){
  	if(this.state.newTaskValue != '') {
		this.itemsRef.push({ title: this.state.newTaskValue}) 
  	}
  	
  	this.setState({newTaskValue: ''})
  }

_renderItem(item) {
	const onPress = () => {
      Alert.alert(
        'Mark this task as completed and remeove from the list',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };


    return (
      <View style={[{margin:10, flexDirection:'row', alignItems:'stretch'}]}>
      <Text style={{padding: 10}}>{item.title}</Text>
      <Button
      onPress = {onPress}
      	title="Done"
      	color='blue'
      />
      <View style={[{backgroundColor:'#eee', height:1, marginTop:5}]}/>
      </View>
    );
  }

}


