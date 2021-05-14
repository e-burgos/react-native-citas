/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Dates from './components/Dates';

const App = () => {

  // Definir state de citas
  const [dates, setDates] = useState([
    { id: 1, pet: "Nuva", owner: "Esteban", symptom: "No come"},
    { id: 2, pet: "Regi", owner: "Juan", symptom: "No duerme"},
    { id: 3, pet: "Maria", owner: "Pedro", symptom: "No canta"}
  ]);

  const filterDates = (id) => {
    setDates( (dates) => {
      return dates.filter( date => date.id !== id)
    })
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrador de Citas</Text>

      { dates.length == 0 ? 
      <View style={styles.infoText}>
        <Text style={styles.infotitle}>No hay citas, empieza creando una.</Text>
      </View>
      : null}
      

      <FlatList 
        data={dates}
        renderItem={ ({item}) => <Dates date={item} filterDates={filterDates}/> }
        keyExtractor={ date => date.id }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: '#4B8DF5',
    flex: 1
  },
  title: {
    marginTop: 50,
    marginBottom: 10,
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  infotitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  infoText: {
    marginTop: 50,
    backgroundColor: 'red',
    marginVertical: 5,
    marginHorizontal: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20
    },
});

export default App;
