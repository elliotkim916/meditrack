import AddMedicationForm from '@/components/AddMedicationForm';
import AddMedicationHeader from '@/components/AddMedicationHeader';
import React from 'react';
import { ScrollView, Text } from 'react-native';

const AddNewMedication = () => {
  return (
    <ScrollView>
      <AddMedicationHeader />
      <AddMedicationForm />
      <Text></Text>
    </ScrollView>
  );
};

export default AddNewMedication;
