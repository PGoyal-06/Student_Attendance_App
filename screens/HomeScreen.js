import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import db from '../config';

export default class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
    };
  }
  async attendance() {
    var all_students = [];
    var class_ref = await db
      .ref('bombay-international-final')
      .on('value', (data) => {
        var class_a = data.val();
        //console.log(class_a);
        for (var i in class_a) {
          all_students.push(class_a[i]);
          //console.log(class_a[i]);
        }
        //console.log(all_students);
        all_students.sort(function (a, b) {
          return a.roll_no - b.roll_no;
        });
        //console.log(all_students);
      });
    this.setState({ all_students: all_students });
  }
  updateAttendance(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = 'bombay-international-final/' + id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      today: status,
    });
  }
  componentDidMount() {
    this.attendance();
  }
  render() {
    return (
      <View>
        <Text
          style={{
            backgroundColor: 'orange',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {' '}
          School Attendance{' '}
        </Text>

        {this.state.all_students.map((eachStudent) => (
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
            }}>
            <Text style={{ width: 150 }}> {eachStudent.name} </Text>
            <TouchableOpacity
              style={{ backgroundColor: 'green', width: 60 }}
              onPress={() => {
                this.updateAttendance(eachStudent.roll_no, 'present');
              }}>
              <Text style={{ fontWeight: 'bold' }}> present </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: 'red', width: 60 }}
              onPress={() => {
                this.updateAttendance(eachStudent.roll_no, 'absent');
              }}>
              <Text style={{ fontWeight: 'bold' }}> absent </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View></View>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('SummaryScreen');
          }}
          style={{
            marginLeft: 50,
            backgroundColor: 'yellow',
            width: 60,
            marginTop: 20,
          }}>
          <Text style={{ fontWeight: 'bold' }}> Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
