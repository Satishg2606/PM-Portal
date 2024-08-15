import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  VirtualizedList,
  ActivityIndicator,
  Modal,
  SafeAreaView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { LOCALHOST } from '@env';

// Main Dashboard Screen Component
const DashboardScreen = ({ navigation }) => {
  const [showTabs, setShowTabs] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [oneWayDate, setOneWayDate] = useState(new Date());
  const [flightData, setFlightData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('Dubai');
  const [destination, setDestination] = useState('Pune');

  useEffect(async()=>{
    setLoading(true);
    try {
      const response = await fetch(
        `${LOCALHOST}/flight/checkAvailableFlights?from=${source}&to=${destination}&date=${formatDate(oneWayDate)}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setFlightData(data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  },flightData)
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const openCalendar = () => setCalendarVisible(true);
  const closeCalendar = () => {
    setOneWayDate(selectedDate);
    setCalendarVisible(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${LOCALHOST}/flight/checkAvailableFlights?from=${source}&to=${destination}&date=${formatDate(oneWayDate)}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setFlightData(data);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.dashboardContainer}>
      {showTabs && (
        <View style={styles.modalContainer}>
          <ScrollView style={styles.container}>
            <View style={styles.row}>
              <FlightInput
                placeholder="Mumbai"
                icon={require('../public/images/takeoff.png')}
                onChangeText={setSource}
              />
              <FlightInput
                placeholder="Bangkok"
                icon={require('../public/images/planelanding.png')}
                onChangeText={setDestination}
              />
            </View>
            <DateInput
              placeholder={formatDate(oneWayDate)}
              icon={require('../public/images/calender.png')}
              onPress={openCalendar}
            />
          </ScrollView>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              setShowTabs(false);
              setShowSearch(true);
              handleSearch();
            }}
          >
            <Image
              source={require('../public/images/search.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.flightListContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.flightListTitle}>Flights</Text>
          {showSearch && (
            <TouchableOpacity
              onPress={() => {
                setShowTabs(true);
                setShowSearch(false);
              }}
            >
              <Image
                source={require('../public/images/search.png')}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#003366" />
        ) : (
          <VirtualizedList
            data={flightData}
            initialNumToRender={4}
            renderItem={({ item }) => {
              const departureTime = item.departureDate.split('T')[1].substring(0, 5);
              const departureDate = item.departureDate.split('T')[0];

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('bookFlight', { selectedFlight: item })}
                >
                  <View style={styles.card}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.airlineText}>{item.flightName}</Text>
                      <Text style={styles.priceText}>${item.price}</Text>
                    </View>
                    <View style={styles.cardBody}>
                      <View style={styles.infoRow}>
                        <Image
                          source={require('../public/images/clock.png')}
                          style={styles.icon1}
                        />
                        <Text style={styles.timeText}>
                          {departureDate} at {departureTime}
                        </Text>
                      </View>
                      <View style={styles.infoRow}>
                        <Image
                          source={require('../public/images/seat.png')}
                          style={styles.icon1}
                        />
                        <Text style={styles.seatsText}>Available Seats: {item.availableSeats}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.flightId.toString()}
            getItemCount={() => flightData.length}
            getItem={(data, index) => data[index]}
          />
        )}
      </View>

      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCalendar}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarModalContainer}>
            <DatePicker
              mode="date"
              date={selectedDate}
              onDateChange={setSelectedDate}
            />
            <TouchableOpacity
              style={styles.closeCalendarButton}
              onPress={closeCalendar}
            >
              <Text style={styles.closeCalendarButtonText}>Select Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// Reusable Flight Input Component
const FlightInput = ({ placeholder, icon, onChangeText }) => (
  <View style={styles.flightInputContainer}>
    <Image source={icon} style={styles.icon} />
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="black"
      style={styles.flightInput}
      onChangeText={onChangeText}
    />
  </View>
);

// Reusable Date Input Component
const DateInput = ({ placeholder, icon, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.flightInputContainer}>
    <Image source={icon} style={styles.icon} />
    <Text style={styles.flightInput}>{placeholder}</Text>
  </TouchableOpacity>
);

// Styles
const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#ADBBDA',
  },
  modalContainer: {
    flex: 0.3,
    backgroundColor: '#3D5280',
    paddingHorizontal: 15,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#3D5280',
  },
  row: {
    flexDirection: 'row',
  },
  flightInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 15,
  },
  flightInput: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  searchButton: {
    position: 'absolute',
    bottom: 6,
    right: 0,
    backgroundColor: '#7091E6',
    width: 60,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  flightListContainer: {
    flex: 1,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  flightListTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003366',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginVertical: 10,
    textShadowColor: '#ccc',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardBody: {
    paddingVertical: 5,
  },
  airlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  timeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3D5280',
  },
  seatsText: {
    fontSize: 16,
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarModalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeCalendarButton: {
    backgroundColor: '#3D5280',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeCalendarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon1: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#7091E6', // Optional: Tint color to match the theme
  },

});

export default DashboardScreen;
