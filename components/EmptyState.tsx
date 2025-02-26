import colors from '@/Constant/colors';
import strings from '@/Constant/strings';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const EmptyState = () => {
  return (
    <View style={{ marginTop: 80, display: 'flex', alignItems: 'center' }}>
      <Image
        source={require('./../assets/images/medicine.png')}
        style={{ width: 120, height: 120 }}
      />
      <Text style={{ fontSize: 35, fontWeight: 'bold', marginTop: 30 }}>
        {strings.NO_MEDICATIONS}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: colors.DARK_GRAY,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        {strings.NO_MEDICATIONS_SUBTEXT}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colors.PRIMARY,
          padding: 15,
          borderRadius: 10,
          width: '100%',
          marginTop: 30,
        }}
      >
        <Text style={{ textAlign: 'center', fontSize: 17, color: 'white' }}>
          {strings.ADD_NEW_MED}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
