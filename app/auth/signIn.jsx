import React, { useState, useContext } from 'react';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { API_BASE_URL } from "../../config";

export default function SignIn() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await auth?.login(email, password);
      router.replace('/(tabs)/home'); 
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome Back</Text>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.textInput}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an Account?</Text>
        <Pressable onPress={() => router.push('/auth/signUp')}>
          <Text style={styles.signupLink}>Create New Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 100,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  logo: {
    height: 180,
    width: 180,
  },
  title: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    paddingTop: 30,
  },
  textInput: {
    borderWidth: 1,
    width: '90%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    width: '90%',
    marginTop: 25,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'outfit',
    fontSize: 20,
    color: Colors.WHITE,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
  signupText: {
    fontFamily: 'outfit',
  },
  signupLink: {
    color: Colors.PRIMARY,
    fontFamily: 'outfit-bold',
  },
});
