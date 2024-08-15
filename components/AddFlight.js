import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import TimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import { LOCALHOST } from '@env';


const AddFlightScreen = () => {
  const [flightName, setFlightName] = useState('');
  const [boardingPoint, setBoardingPoint] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [departureTime, setDepartureTime] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [airportData, setAirportData] = useState([]);

  const [boardingOpen, setBoardingOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  useEffect(() => {
    // Fetch airport data from the API
    fetch(`${LOCALHOST}/airport/getAllAirport`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle non-200 responses
        }
        return response.json();
      })
      .then(data => {
        // Format the data for the dropdown picker
        const formattedData = data.map(airport => ({
          label: airport.name, // Assuming 'name' is the key for the airport name
          value: airport.airportId, // Assuming 'airportId' is the key for the airport ID
        }));
        setAirportData(formattedData);
      })
      .catch(error => {
        console.error('Error fetching airport data:', error.message);
      });
  }, []);


  const handleSubmit = async () => {
    // Validation checks before submitting
    if (!flightName) {
      alert('Please enter the flight name.');
      return;
    }

    if (!boardingPoint) {
      alert('Please select a boarding point.');
      return;
    }

    if (!destination) {
      alert('Please select a destination.');
      return;
    }
    if(!date || !time){
      alert('Please enter a date time');
      return;
    }
    const formattedDate = date.toISOString().split('T')[0];
    const formattedTime = time.toTimeString().split(' ')[0];
    setDepartureTime(`${formattedDate}T${formattedTime}`);
    console.log(departureTime);


    if (!price || isNaN(price) || Number(price) <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    if (!capacity || isNaN(capacity) || Number(capacity) <= 0) {
      alert('Please enter a valid capacity.');
      return;
    }

    // Prepare the data to be sent
    const flightData = {
      flightName,
      originAirportId:boardingPoint,
      destinationAirportId:destination,
      departureDate:departureTime,
      price: Number(price), // Convert to number to ensure proper formatting
      availableSeats: Number(capacity), // Convert to number to ensure proper formatting
    };

    try {
      const response = await fetch(`${LOCALHOST}/flight/scheduleFlight`, { // Replace with your local IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Something went wrong while scheduling the flight.');
      }

      const result = await response.json();
      console.log('Flight scheduled successfully:', result);
      alert('Flight scheduled successfully!');

      // Optionally reset the form fields after successful submission
      setFlightName('');
      setBoardingPoint('');
      setDestination('');
      setDate(new Date());
      setTime(new Date());
      setPrice('');
      setCapacity('');
    } catch (error) {
      console.error('Error scheduling flight:', error.message);
      alert('Failed to schedule the flight. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Add Flight</Text>
      <TextInput
        style={styles.input}
        placeholder="Flight Name"
        value={flightName}
        onChangeText={setFlightName}
      />

      {/* Boarding Airport Dropdown */}
      <DropDownPicker
        open={boardingOpen}
        value={boardingPoint}
        items={airportData}
        setOpen={setBoardingOpen}
        setValue={setBoardingPoint}
        setItems={setAirportData}
        placeholder="Select Boarding Airport"
        style={styles.input}
      />

      {/* Destination Airport Dropdown */}
      <DropDownPicker
        open={destinationOpen}
        value={destination}
        items={airportData}
        setOpen={setDestinationOpen}
        setValue={setDestination}
        setItems={setAirportData}
        placeholder="Select Destination Airport"
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setCalendarVisible(true)}>
        <Text style={styles.dateText}>Date: {date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setTimePickerVisible(true)}>
        <Text style={styles.dateText}>Time: {time.toTimeString().split(' ')[0]}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Capacity"
        value={capacity}
        keyboardType="numeric"
        onChangeText={setCapacity}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Flight</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModalContainer}>
            <DatePicker mode="date" date={date} onDateChange={setDate} />
            <TouchableOpacity
              style={styles.closeCalendarButton}
              onPress={() => setCalendarVisible(false)}>
              <Text style={styles.closeCalendarButtonText}>Select Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Picker */}
      {isTimePickerVisible && (
        <TimePicker
          mode="time"
          value={time}
          onChange={(event, selectedTime) => {
            const currentTime = selectedTime || time;
            setTime(currentTime);
            setTimePickerVisible(false);
          }}
        />
      )}
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
    zIndex: 1000, // Important for DropDownPicker to display above other elements
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateText: {
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
  calendarModalContainer: {
    width: '80%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADBBDA',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  closeCalendarButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#7091E6',
    borderRadius: 5,
  },
  closeCalendarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default AddFlightScreen;
