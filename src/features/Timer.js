import React, { useState } from "react";
import { StyleSheet, Text, View, Vibration, Platform } from "react-native";
import { Button, ProgressBar, TextInput } from "react-native-paper";
import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/color";
import Countdown from "../components/Countdown";
import { Timing } from "./Timing";

import { useKeepAwake } from "expo-keep-awake";

const DEFAULT_TIME = 0.1;

const Timer = ({ focusSubject, onTimerEnd, cancelSubject}) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000)      
    } else {
      Vibration.vibrate(5000)
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  }

  const changeTime = (min) => {
    setMinutes(min)
    setProgress(1);
    setIsStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown 
        minutes={minutes} 
        isPaused={!isStarted} 
        onProgress={onProgress}
        onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing on : </Text>
        <Text style={styles.task}> {focusSubject} </Text>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar 
        progress={progress}
        color="#000000"
        style={styles.progressBar}
        />
      </View>

      <View style={styles.buttonWrapper}>
          <Timing onChangeTime={(min) => changeTime(min)}/>
      </View>

      <Button 
      mode="outlined"
      style={styles.buttonStart}
      title={isStarted ? "Stop Time!" : "Start Time!"}
      onPress={() => {
        if (isStarted) 
        {
            setIsStarted(false)
        } else { 
          setIsStarted(true)
        }
      }}
      >{ isStarted ? "Stop Time!" : "Start Time!"}
      </Button>

      <Button
            mode='contained'
            color='#DDBEBE'
            style={styles.buttonStart}
            onPress={cancelSubject}
            >CLEAR SESSION</Button>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: "center",
  },
  titleButton: {
    fontSize: fontSizes.md,
    color: "#000000",
    textAlign: "center",
  },
  task: {
    fontSize: fontSizes.lg,
    color: colors.light,
    textAlign: "center",
    fontWeight: "bold",
  },
  progressBar: {
    marginVertical: spacing.lg,
    height: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  progressBarContainer: {
    marginVertical: spacing.lg,
  },
  buttonWrapper: {
    flexDirection: "row",
    marginHorizontal: spacing.lg,
    justifyContent: "space-evenly",
  },
  minuteButton: {
    paddingHorizontal: spacing.sm - 2,
    borderRadius: 60,
    borderColor: colors.light,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStart: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
    marginLeft: spacing.xl,
    marginRight: spacing.xl,
    borderColor: colors.light,
    backgroundColor: "#00FF00",
  }
});
