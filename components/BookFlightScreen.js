import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {LOCALHOST} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookFlightScreen = ({route, navigation}) => {
  const {selectedFlight} = route.params;
  console.log(selectedFlight);
  

  const [travelers, setTravelers] = useState([
    {travelerName: '', gender: '', passportNo: '', age: ''},
  ]);

  const handleAddTraveler = () => {
    setTravelers([
      ...travelers,
      {travelerName: '', gender: '', passportNo: '', age: ''},
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedTravelers = travelers.map((traveler, i) =>
      i === index ? {...traveler, [field]: value} : traveler,
    );
    setTravelers(updatedTravelers);
  };

  const handleBookFlight = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log("UserId (String):", userId);
  
    const bookingDetails = travelers.map(traveler => ({
      name: traveler.travelerName,
      gender: traveler.gender,
      passportNo: traveler.passportNo,
      age: traveler.age,
    }));
  
    try {
      const response = await fetch(`${LOCALHOST}/reservation/bookFlight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId), // Convert userId to integer
          flightId: parseInt(selectedFlight.flightId), // Convert flightId to integer
          travellerList: bookingDetails,
        }),
      });
      
      if (response) {
        // const result = await response.json();
        Alert.alert('Success', 'Flight booked successfully!');
        navigation.navigate('dashboard');
      } else {
        const result = await response.json();
        Alert.alert('Error', result.message || 'Booking failed.');
      }
    } catch (error) {
      console.error('Error booking flight:', error.message);
      Alert.alert('Error', 'Failed to book flight.');
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Flight</Text>
      {travelers.map((traveler, index) => (
        <View key={index} style={styles.travelerContainer}>
          <Text style={styles.sectionTitle}>Traveler {index + 1}</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={traveler.travelerName}
            onChangeText={text =>
              handleInputChange(index, 'travelerName', text)
            }
          />
          <TextInput
            style={styles.input}
            placeholder="gender"
            value={traveler.gender}
            onChangeText={text => handleInputChange(index, 'gender', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Passport No"
            value={traveler.passportNo}
            onChangeText={text => handleInputChange(index, 'passportNo', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={traveler.age}
            onChangeText={text => handleInputChange(index, 'age', text)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTraveler}>
        <Text style={styles.addButtonText}>Add Traveler</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookButton} onPress={handleBookFlight}>
        <Text style={styles.bookButtonText}>Book Flight</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F0F2',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  travelerContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3D5280',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#3D5280',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#7091E6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookFlightScreen;
