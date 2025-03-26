import colors from '@/Constant/colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MedListItem } from './MedicationList';

interface Props {
  medicine: MedListItem;
}

const MedicationCardItem = ({ medicine }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine.type.icon }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {medicine.name}
          </Text>
          <Text style={{ fontSize: 17 }}>{medicine.when}</Text>
          <Text style={{ color: 'white' }}>
            {medicine.dose} {medicine.type.name}
          </Text>
        </View>
      </View>

      <View style={styles.reminderContainer}>
        <MaterialIcons name="timer" size={24} color="black" />
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          {medicine?.reminder}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderContainer: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default MedicationCardItem;
