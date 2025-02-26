import { auth } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { Href, useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const onCreateAccount = async () => {
    console.log('ON CREATE CALLED');
    if (!email || !password || !userName) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'Please fill out all details',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if (user) {
        await updateProfile(user, {
          displayName: userName,
        });
      }

      router.push('(tabs)' as Href);
    } catch (e) {
      const error = e as FirebaseError;
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('ERROR', errorCode);

      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'ERROR',
        text2:
          errorCode === 'auth/email-already-in-use'
            ? 'This email already exists.'
            : errorMessage,
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.textHeader}>Create New Account</Text>

      <View style={{ marginTop: 25 }}>
        <Text>Full Name</Text>
        <TextInput
          placeholder="Full Name"
          style={styles.textInput}
          onChangeText={(value) => setUserName(value)}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={{ marginTop: 25 }}>
        <Text>Password</Text>
        <TextInput
          secureTextEntry
          placeholder="Password"
          style={styles.textInput}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => onCreateAccount()}>
        <Text style={{ fontSize: 17, color: 'white', textAlign: 'center' }}>
          Create Account
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCreate}
        onPress={() => router.push('/login/signIn')}
      >
        <Text
          style={{ fontSize: 17, color: colors.PRIMARY, textAlign: 'center' }}
        >
          Already have an account? Sign in
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

export default SignUp;
