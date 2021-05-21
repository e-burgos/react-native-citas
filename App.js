import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, ImageBackground, Platform, ScrollView, TouchableHighlight } from 'react-native';
import Dates from './components/Dates';
import Form from './components/Form';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './components/Header';

const bg = { uri: "https://raw.githubusercontent.com/e-burgos/react-native-citas/master/img/backgroundApp.jpeg" };

const App = () => {

  // Inicializar boton de agregar cita
  const [addButtonDate, setAddButtonDate] = useState(true);
  // Definir state de citas
  const [dates, setDates] = useState([]);

  // Chequear datos en local storage al iniciar la app
  useEffect(() => {
    getDataStorage();
  }, [])

  // Obtene citas del storarage
  const getDataStorage = async () => {
    try {
      const storageDates = await AsyncStorage.getItem('dates');
      if(storageDates){
        setDates(JSON.parse(storageDates));
      };
    } catch (error) {
      console.log(error)
    }
  }

  // Eliminar u cita
  const filterDates = (id) => {
    const updateDates = dates.filter(date => date.id !== id);
    setDates(updateDates);
    saveDataStorage(JSON.stringify(updateDates));
  }
  

  // Ocultar formulario
  const showDateForm = () => {
      setAddButtonDate(false);
  };

  // Guardar/actualizar datos en storage
  const saveDataStorage = async (jsonDates) => {
      try {
          // Almacenamos data en local storage
          await AsyncStorage.setItem('dates', jsonDates);
      } catch (error) {
          console.log(error)
      }
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} style={styles.image}>
        
        <Header />
        
        { dates.length == 0 && addButtonDate ? 
            <View style={styles.infoText}>
                <Text style={styles.infotitle}>No hay citas, empieza creando una.</Text>
            </View>
        : null }

        {addButtonDate ?
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
              setAddButtonDate={setAddButtonDate}
              saveDataStorage={saveDataStorage}
            />
          </ScrollView>
        }
        { addButtonDate ? 
          <FlatList 
            data={dates}
            renderItem={ ({item}) => <Dates date={item} filterDates={filterDates}/> }
            keyExtractor={date => date.id}
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
