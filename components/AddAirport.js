import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LOCALHOST } from '@env';


const AddAirportScreen = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  const handleAddAirport = async () => {
    // Validation checks before submitting
    if (!name) {
      alert('Please enter the airport name.');
      return;
    }

    if (!country) {
      alert('Please enter the country.');
      return;
    }

    if (!city) {
      alert('Please enter the city.');
      return;
    }

    // Prepare the data to be sent
    const airportData = {
      name,
      country,
      city,
    };

    try {
      const response = await fetch(`${LOCALHOST}/airport/addAirport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(airportData),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Something went wrong while adding the airport.');
      }

      const result = await response.json();
      console.log('Airport added successfully:', result);
      alert('Airport added successfully!');

      // Optionally reset the form fields after successful submission
      setName('');
      setCountry('');
      setCity('');
    } catch (error) {
      console.error('Error adding airport:', error.message);
      alert('Failed to add the airport. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Airport</Text>
      <TextInput
        style={styles.input}
        placeholder="Airport Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleAddAirport}>
        <Text style={styles.submitButtonText}>Add Airport</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ADBBDA',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  submitButton: {
    backgroundColor: '#3D5280',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddAirportScreen;
