import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList, ImageBackground, Platform, ScrollView, TouchableHighlight } from 'react-native';
import Dates from './components/Dates';
import Form from './components/Form';

//const image = { uri: "https://wallpaperaccess.com/full/2001368.jpg" };

const App = () => {

  // Inicializar boton de agregar cita
  const [addBottonDate, setAddBottonDate] = useState(true);

  // Definir state de citas
  const [dates, setDates] = useState([
    { id: 1, pet: "Perro, Nuva", owner: "Esteban Burgos", date: "1 de mayo de 2021", time: "10:30", symptom: "No come el alimento recetado."},
    { id: 2, pet: "Gata, Regi", owner: "Juan Lopez", date: "5 de mayo de 2021", time: "11:00", symptom: "No duerme por las noches, tiene exceso de energía."},
    { id: 3, pet: "Perico, Maria", owner: "Pedro Fernandez", date: "10 de mayo de 2021", time: "12:00", symptom: "Ya no canta como antes, chequear edad y patrones de sueño."},
  ]);

  const filterDates = (id) => {
    setDates( (dates) => {
      return dates.filter( date => date.id !== id)
    })
  }

  // Ocultar formulario
  const showDateForm = () => {
      setAddBottonDate(false);
  };
  
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./img/backgroundApp.jpeg')} style={styles.image}>
        
        <Text style={styles.title}>Citas para Mascotas</Text>
        
        { dates.length == 0 && addBottonDate ? 
            <View style={styles.infoText}>
                <Text style={styles.infotitle}>No hay citas, empieza creando una.</Text>
            </View>
        : null }

        {addBottonDate ?
          <View style={styles.formContainer}>
              <TouchableHighlight onPress={() => showDateForm()} style={styles.addDateButton}>
                  <Text style={styles.buttonText}>Crear Cita</Text>
              </TouchableHighlight>
          </View>
          : 
          <ScrollView>
            <Form 
              style={styles.container}
              dates={dates}
              setDates={setDates}
              setAddBottonDate={setAddBottonDate}
            />
          </ScrollView>
        }
        { addBottonDate ? 
          <FlatList 
            data={dates}
            renderItem={ ({item}) => <Dates date={item} filterDates={filterDates}/> }
            keyExtractor={ date => date.id }
          />
        : null }
        

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 50 : 30,
    marginBottom: 10,
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: 'rgba(255,255,255, 0.7)',
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  addDateButton: {
    backgroundColor: '#4B8DF5',
    borderRadius: 5,
    padding: 10,
    },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  infotitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  infoText: {
    marginTop: 20,
    backgroundColor: 'red',
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});

export default App;
