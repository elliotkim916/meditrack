import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

const AddMedicationHeader = () => {
  const router = useRouter();
  return (
    <View>
      <Image
        source={require('./../assets/images/consult.png')}
        style={{ width: '100%', height: 280 }}
      />
      <TouchableOpacity
        style={{ padding: 25, position: 'absolute' }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default AddMedicationHeader;
