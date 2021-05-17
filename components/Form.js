import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Button, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Form = ({dates, setDates, setAddBottonDate}) => {

    // Inicializar campos del formulario
    const [pet, setPet] = useState('')
    const [owner, setOwner] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [symptom, setSymptom] = useState('')

    // Inicializar state de datepickers 
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // Ocultar formulario
    const hideDateForm = () => {
        setAddBottonDate(true);
    };

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
        hideDatePicker();
    };

     // Mostrar/ocultar hora
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    // Confirmar hora
    const handleConfirmTime = (time) => {
        const options = {hour12: false, hour: '2-digit', minute: '2-digit'};
        setTime(time.toLocaleTimeString('es-ES', options))
        hideTimePicker();
    };

    // Mostrar alertas
    const showAlert = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: 'OK'
            }]
        )
    }

    // agregar una cita
    const addDate = () => {
        // Validar
        if(pet.trim() === '' || owner.trim() === '' || phone.trim() === '' || 
            date.trim() === '' || time.trim() === '' || symptom.trim() === ''){
            showAlert();
            return;
        };
        // Construimos la nueva cita
        const newDate = {pet, owner, phone, date, time, symptom};
        newDate.id = shortid.generate();
        // Actualizamos state de citas
        const allDates = [...dates, newDate];
        setDates(allDates);
        // Ocualtamos formulario
        hideDateForm(false)
        // Reiniciar state de campos
        setPet('');
        setPhone('');
        setSymptom('');
        setDate('');
        setTime('');
        setOwner('');
    }

    return (
       
            
                <View style={styles.formContainer}>
                    <View>
                        <Text style={styles.label}>Mascota:</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={ (text) => setPet(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Propieratio:</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={ (text) => setOwner(text)}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Teléfono de Contacto:</Text>
                        <TextInput 
                            style={styles.input}
                            onChangeText={ (text) => setPhone(text)}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.pickerContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Fecha:</Text>
                            <Text style={styles.pickerText}>{date}</Text>
                        </View>
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
                    <View style={styles.pickerContainer}>
                        <View style={styles.labelContainer}>
                            <Text style={styles.label}>Hora:</Text>
                            <Text style={styles.pickerText}>{time}</Text>
                        </View>
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
                            onChangeText={ (text) => setSymptom(text)}
                        />
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => addDate()} style={styles.button}>
                            <Text style={styles.buttonText}>Agregar Cita</Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => hideDateForm()} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
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
    labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 10
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    pickerText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'green',
        marginLeft: 10
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
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    cancelButton: {
        backgroundColor: '#727983',
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    },
    pickerContainer: {
        marginVertical: 10,
    }
})
 
export default Form;