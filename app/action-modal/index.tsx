import MedicationCardItem from '@/components/MedicationCardItem';
import { MedListItem } from '@/components/MedicationList';
import colors from '@/Constant/colors';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const MedicationActionModal = () => {
  const medicine = useLocalSearchParams();

  const updatedMedicine = {
    docId: medicine.docId,
    dose: medicine.dose,
    endDate: Number(medicine.endDate),
    name: medicine.name,
    reminder: medicine.reminder,
    selectedDate: medicine.selectedDate,
    startDate: Number(medicine.startDate),
    type: { icon: '', name: '' },
    userEmail: medicine.userEmail,
    when: medicine.when,
  } as MedListItem;

  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/notification.gif')}
        style={{ width: 120, height: 120, backgroundColor: 'white' }}
      />
      <Text style={{ fontSize: 18 }}>{medicine.selectedDate}</Text>
      <Text style={{ fontSize: 30, fontWeight: 'bold', color: colors.PRIMARY }}>
        {updatedMedicine.reminder}
      </Text>
      <Text style={{ fontSize: 18 }}>Its time to take!</Text>

      <MedicationCardItem medicine={updatedMedicine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#ffffff',
  },
});
export default MedicationActionModal;
