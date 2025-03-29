import colors from '@/Constant/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MedListItem } from './MedicationList';

interface Props {
  medicine: MedListItem;
  selectedDate?: string;
}

interface Status {
  date: string;
  status: string;
  time: string;
}

const MedicationCardItem = ({ medicine, selectedDate }: Props) => {
  const [status, setStatus] = useState<Status>();

  const checkStatus = () => {
    if (medicine.action) {
      const data = medicine?.action.find((item) => item.date === selectedDate);
      console.log('DATA', data);
      setStatus(data);
    }
  };

  useEffect(() => {
    if (medicine) {
      checkStatus();
    }
  }, [medicine]);

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

      {status?.date && (
        <View style={styles.statusContainer}>
          {status.status === 'Taken' ? (
            <MaterialIcons name="check-circle" size={24} color={colors.GREEN} />
          ) : (
            <AntDesign name="closecircle" size={24} color="red" />
          )}
        </View>
      )}
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
  statusContainer: {
    position: 'absolute',
    top: 5,
    padding: 7,
  },
});

export default MedicationCardItem;
