import { auth } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { setLocalStorage } from '@/service/Storage';
import { Href, useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Please fill out all details',
        visibilityTime: 3000,
      });
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await setLocalStorage('userDetail', user);
        router.replace('(tabs)' as Href);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === 'auth/invalid-credential') {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error',
            text2: 'Invalid email or password.',
            visibilityTime: 3000,
          });
        } else {
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: errorCode,
            text2: errorMessage,
            visibilityTime: 3000,
          });
        }
      });
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Let's Sign You In</Text>
      <Text style={styles.subText}>Welcome Back</Text>
      <Text style={styles.subText}>You've Been Missed!</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="email"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="password"
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onSignIn()}>
        <Text style={{ fontSize: 17, color: 'white', textAlign: 'center' }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push('/login/signUp')}
      >
        <Text
          style={{ fontSize: 17, color: colors.PRIMARY, textAlign: 'center' }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  subText: {
    marginTop: 10,
    color: colors.GRAY,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    fontSize: 17,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'white',
  },
  button: {
    padding: 20,
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
  buttonCreate: {
    padding: 20,
    backgroundColor: 'shite',
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
});

export default SignIn;
