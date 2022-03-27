import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import db from '../config';

export default class SummaryScreen extends Component {
  constructor() {
    super();
    this.state = {
      absent: 0,
      present: 0,
    };
  }
  async attendance() {
    var all_students = [];
    var present = 0;
    var absent = 0;
    var class_ref = await db
      .ref('bombay-international-final')
      .on('value', (data) => {
        var class_a = data.val();

        for (var i in class_a) {
          all_students.push(class_a[i]);
        }

        all_students.sort(function (a, b) {
          return a.roll_no - b.roll_no;
        });
      });
    console.log(all_students);
    for (var i in all_students) {
      if (all_students[i].today == 'present') {
        present = present + 1;
      } else if (all_students[i].today == 'absent') {
        absent = absent + 1;
      }
    }
    this.setState({ present: present, absent: absent });
    console.log(this.state.present);
  }
  componentDidMount() {
    this.attendance();
  }
  render() {
    return (
      <View>
        <Text
          style={{
            backgroundColor: 'aqua',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 20,
          }}>
          {' '}
          Summary Screen{' '}
        </Text>
        <Text style={{ backgroundColor: 'lime', fontWeight: 'bold' }}>
          {' '}
          number of students present: {this.state.present}{' '}
        </Text>
        <Text style={{ backgroundColor: 'red', fontWeight: 'bold' }}>
          {' '}
          number of students absent: {this.state.absent}{' '}
        </Text>
      </View>
    );
  }
}
