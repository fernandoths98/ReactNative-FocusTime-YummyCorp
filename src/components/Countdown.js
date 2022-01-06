import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/sizes'
import { colors } from '../utils/color'

const minutesToMillis = (min) => min * 1000 * 60;
const FormatTime = (time) => time < 10 ? `0${time}` : time;
const Countdown = ({
    minutes = 0.1,
    isPaused,
    onProgress,
    onEnd
}) => {
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes)) 
  }, [minutes])

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes))
    if (millis === 0) {
      onEnd();
    }
  }, [millis])

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current) 
        return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => 
      clearInterval(interval.current)
    
  }, [isPaused])

  const [millis, setMillis] =useState(minutesToMillis(minutes))

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>{FormatTime(minute)} : {FormatTime(seconds)}</Text>
  )
}

export default Countdown;

const styles = StyleSheet.create ({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)'
  }
})