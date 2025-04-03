import MedicationCardItem from '@/components/MedicationCardItem';
import { db } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import React from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type ActionModalParams = {
  selectedDate: string;
  docId: string;
  dose: string;
  endDate: number;
  startDate: number;
  name: string;
  reminder: string;
  type: {
    icon: string;
    name: string;
  };
  userEmail: string;
  when: string;
  action?: { date: string; status: string; time: string }[];
};

const MedicationActionModal = () => {
  const medicine = useLocalSearchParams();
  const router = useRouter();

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
  } as ActionModalParams;

  const updateActionStatus = async (status: string) => {
    try {
      const docRef = doc(db, 'medication', updatedMedicine.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status,
          time: moment().format('LT'),
          date: medicine.selectedDate,
        }),
      });

      if (Platform.OS === 'web') {
        alert('Response Saved!');
        router.push('/(tabs)');
      } else {
        Alert.alert(status, 'Response Saved!', [
          { text: 'Okay', onPress: () => router.replace('/(tabs)') },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

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

      <View style={styles.buttonContainer}>
        <View>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => updateActionStatus('Missed')}
          >
            <MaterialIcons name="close" size={24} color="red" />
            <Text style={{ fontSize: 20, color: 'red' }}>Missed</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.successButton}
            onPress={() => updateActionStatus('Taken')}
          >
            <MaterialIcons name="check" size={24} color="white" />
            <Text style={{ fontSize: 20, color: 'white' }}>Taken</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={{ position: 'absolute', bottom: 25 }}
        onPress={() => router.back()}
      >
        <AntDesign name="closecircle" size={44} color={colors.GRAY} />
      </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
  },
  closeButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 10,
  },
  successButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.GREEN,
  },
});
export default MedicationActionModal;
