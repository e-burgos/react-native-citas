import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Form = () => {

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // Mostrar/ocultar fecha
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

     // Confirmar fecha
    const handleConfirmDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: '2-digit'};
        setDate(date.toLocaleDateString('es-ES', options));
        hideTimePicker();
    };

     // Mostrar/ocultar hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirmTime = (time) => {
        console.warn("A time has been picked: ", time);
        hideTimePicker();
    };

    // agregar una cita
    const addDate = () => {
        console.log('Agregando...')
    }

    return ( 
        <View style={styles.formContainer}>
            <View>
                <Text style={styles.label}>Mascota:</Text>
                 <TextInput 
                    style={styles.input}
                    onChangeText={ (text) => console.log(text)}
                />
            </View>
            <View>
                <Text style={styles.label}>Propieratio:</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ (text) => console.log(text)}
                />
            </View>
            <View>
                <Text style={styles.label}>Teléfono de Contacto:</Text>
                 <TextInput 
                    style={styles.input}
                    onChangeText={ (text) => console.log(text)}
                    keyboardType='numeric'
                />
            </View>
            <View>
                <Text style={styles.label}>Fecha: {date}</Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                    locale='es_ES'
                    headerTextIOS="Elige la fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
            </View>
            <View>
                <Text style={styles.label}>Hora:</Text>
                <Button title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTime}
                    onCancel={hideTimePicker}
                    locale='es_ES'
                    headerTextIOS="Elige una hora"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
            </View>
            <View>
                <Text style={styles.label}>Síntomas:</Text>
                 <TextInput 
                    multiline
                    style={styles.input}
                    onChangeText={ (text) => console.log(text)}
                />
            </View>
            <View>
                <TouchableHighlight onPress={() => addDate()} style={styles.button}>
                    <Text style={styles.buttonText}>Agregar</Text>
                </TouchableHighlight>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: 'rgba(255,255,255, 0.7)',
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        fontSize: 18,
        borderColor: '#e1e1e1',
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: '2.5%'
    },
    button: {
        backgroundColor: '#4B8DF5',
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
 
export default Form;