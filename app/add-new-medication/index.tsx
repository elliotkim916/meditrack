import AddMedicationForm from '@/components/AddMedicationForm';
import AddMedicationHeader from '@/components/AddMedicationHeader';
import React from 'react';
import { Text, View } from 'react-native';

const AddNewMedication = () => {
  return (
    <View>
      <AddMedicationHeader />
      <AddMedicationForm />
      <Text></Text>
    </View>
  );
};

export default AddNewMedication;
