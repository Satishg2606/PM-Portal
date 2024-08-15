import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from 'react-native';
import { LOCALHOST } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
const cEmail = "Satish";
const cPass = "12345";
const LoginScreen = ({ navigation }) => {

  const [data,setData]=useState(null);
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  useEffect(()=>{

  })
  const onRegister = () => {
    navigation.navigate('register');
  };
  const handleLogin = async (email, password) => {
    try {
      // Trim leading and trailing spaces from email and password
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
  
      if (trimmedEmail === "" || trimmedPassword === "") {
        Alert.alert("All fields required");
        return; // Exit the function if fields are empty
      }
  
      const response = await fetch(
        `${LOCALHOST}/user/userLogin?email=${trimmedEmail}&password=${trimmedPassword}`
      );
  
      if (!response.ok) {
        Alert.alert("Invalid credentials");
        return;
      }
  
      const data = await response.json();
      setData(data);
  
      // Store the userId in AsyncStorage
      await AsyncStorage.setItem("userId", data.id.toString());
  
      // Navigate based on the user's role
      if (data.role === "Admin") {
        navigation.navigate("addFlightTab");
      } else {
        navigation.navigate("dashboard");
      }
    } catch (error) {
      console.error("Error:", error.message);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };
  
  
  return (
    <ImageBackground
      source={require('../public/images/loginbg.jpg')} // Ensure this path is correct relative to your project
      style={styles.background}>
      <View style={styles.container}>
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="E-mail ID"
          value={email}
          onChangeText={(text)=>{setEmail(text)}}
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />

        {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={
              showPassword
                ? require('../public/images/eyecross.jpg') // Path to your eye-off icon
                : require('../public/images/eye.png') // Path to your eye-on icon
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

        {/* Forgot Password */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity>
            <Text style={styles.optionText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={()=>{handleLogin(email,password)}}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity
          style={styles.registerContainer}
          onPress={onRegister}>
          <Text style={styles.registerText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={onRegister}>
            <Text style={styles.registerLink}>Register now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with some transparency
    padding: 20,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },

  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#000',
    backgroundColor: '#fff', // Ensure input fields have a solid background color
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  optionText: {
    color: '#6c63ff', // Purple color
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#6c63ff', // Purple color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: '#aaa',
  },
  registerLink: {
    color: '#6c63ff', // Purple color
    marginLeft: 5,
  },
  eyeButton: {
    position: 'absolute',
    right: 10,
    verticalAlign:'middle',
    
  },
  eyeIcon: {
    marginBottom:15,
    width: 20,
    height: 20,
  },

});

export { LoginScreen };
