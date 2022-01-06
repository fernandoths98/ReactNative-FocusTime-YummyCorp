import React from 'react'

import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/color';

export const Timing = ({onChangeTime}) => {
    return (
        <>
           <Button 
                mode='outlined'
                color='#00FF00'
                style={styles.timingButton}
                compact={true}
                onPress={() => onChangeTime(5)}
                >+ 5 minute
        </Button>

         <Button 
                mode='outlined'
                color='#00FF00'
                style={styles.timingButton}
                compact={true}
                onPress={() => onChangeTime(10)}
                >+ 10 minute
        </Button>

         <Button 
                mode='outlined'
                color='#00FF00'
                style={styles.timingButton}
                compact={true}
                onPress={() => onChangeTime(30)}
                >+ 30 minute
        </Button>
        </>
    )
}
const styles = StyleSheet.create({
    timingButton: {
        paddingHorizontal: spacing.sm-2,
        borderRadius: 60,
        borderColor: colors.white

    }
})
