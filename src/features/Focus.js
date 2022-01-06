import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {fontSizes, spacing} from '../utils/sizes'
import {colors} from '../utils/color'

const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}> What would you like to focus on ? </Text>
        <View style={styles.inputContainer}>
          <TextInput 
          onChangeText={(text) => setSubject(text)} />
          <Button
            mode="contained"
            color="#00FF00"
            style={styles.focusButton}
            onPress={() => {
              if (subject !== '') {
                addSubject(subject);
              }
            }}>
            Send Focus Time!
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
    marginLeft: 5,
    marginRight: 5,
  },
  inputContainer: {
    paddingTop: 10,
  },
  focusButton: {
    marginTop: 5,
  }
});

