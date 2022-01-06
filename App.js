import React, { useState } from "react";
import { Text, View, StyleSheet, Platform, AsyncStorage } from "react-native";
import Focus from "./src/features/Focus";
import { colors } from "./src/utils/color";
import Timer from "./src/features/Timer";
import Countdown from "./src/components/Countdown";
import FocusHistory from "./src/features/FocusHistory";

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 2
}
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, {key: String(focusHistory.length + 1), subject, status}])
  }

  const onClear = () => {
      setFocusHistory([])
  }

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e)
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history))
      }
    } catch (e) {
      console.log(e)
    }
  }

  // useEffect(() => {
  //   loadFocusHistory()
  // }, [])

  // useEffect(() => {
  //   saveFocusHistory()
  // }, [focusHistory])

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          cancelSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null)}
          }
        />
      ) : (
        <View style={{flex: 0.5}}>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B4F72",
    alignContent: "center",
    justifyContent: "center",
  },
});
