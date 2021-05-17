import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native'

const Dates = ({date, filterDates}) => {

    const destroyDate = (id) => {
        filterDates(id);
    }

    return ( 
        <View style={styles.dateContainer}>
            <View style={styles.dateLabel}>
                <Text style={styles.label}>Mascota:</Text>
                <Text style={styles.text}>{date.pet}</Text>
            </View>
            <View style={styles.dateLabel}>
                <Text style={styles.label}>Propieratio:</Text>
                <Text style={styles.text}>{date.owner}</Text>
            </View>
            <View style={styles.dateLabel}>
                <Text style={styles.label}>Horario Programado:</Text>
                <Text style={styles.text}>{date.time}</Text>
            </View>
            <View style={styles.dateLabel}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.text}>{date.date}</Text>
            </View>
            <View style={styles.dateLabel}>
                <Text style={styles.label}>Síntomas:</Text>
                <Text style={styles.text}>{date.symptom}</Text>
            </View>
            <View>
                <TouchableHighlight onPress={() => destroyDate(date.id)} style={styles.button}>
                    <Text style={styles.buttonText}>&times; Eliminar</Text>
                </TouchableHighlight>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    dateContainer: {
        backgroundColor: 'rgba(255,255,255, 0.8)',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    dateLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontSize: 18,
        marginLeft: 4,
        marginRight: 80
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 10,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
 
export default Dates;