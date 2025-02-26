import colors from '@/Constant/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Login = () => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.childView}>
        <Image
          source={require('./../../assets/images/login.png')}
          style={styles.image}
        />
      </View>

      <View
        style={{
          padding: 25,
          backgroundColor: colors.PRIMARY,
          height: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}
        >
          Stay on Track, Stay Healthy!
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Track your meds, take control of your health. Stay consistent, stay
          confident.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/login/signIn')}
        >
          <Text
            style={{ textAlign: 'center', fontSize: 16, color: colors.PRIMARY }}
          >
            Continue
          </Text>
        </TouchableOpacity>

        <Text style={{ color: 'white', marginTop: 4 }}>
          Note: By clicking the Continue Button, you will agree to our terms &
          conditions
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  childView: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  image: {
    width: 210,
    height: 450,
    borderRadius: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 99,
    marginTop: 25,
  },
});

export default Login;
