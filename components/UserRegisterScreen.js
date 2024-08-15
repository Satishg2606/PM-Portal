import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Switch } from 'react-native';

const RegisterScreen = ({navigation}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const toggleRoleSwitch = () => setIsAdmin(previousState => !previousState);

  return (
    <ImageBackground
      source={require('../public/images/loginbg.jpg')} // Ensure this path is correct relative to your project
      style={styles.background}
    >
      <View style={styles.container}>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaa"
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="E-mail ID"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />

        {/* Mobile Input */}
        <TextInput
          style={styles.input}
          placeholder="Mobile"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
        />

        {/* Role Toggle */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>{isAdmin ? 'Admin' : 'User'}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#6c63ff' }}
            thumbColor={isAdmin ? '#6c63ff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleRoleSwitch}
            value={isAdmin}
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>

        {/* Back to Login Link */}
        <TouchableOpacity style={styles.loginLinkContainer} onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Back to Login</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderRadius: 10,
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
    backgroundColor: '#fff',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  roleText: {
    fontSize: 18,
    color: '#000',
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#6c63ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginLinkContainer: {
    flexDirection: 'row',
  },
  loginLink: {
    color: '#6c63ff',
    fontSize: 16,
  },
});

export default RegisterScreen;
