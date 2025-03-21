import { db } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { typeList, whenToTake } from '@/Constant/options';
import {
  ConvertDateTime,
  formatDateForText,
  formatTime,
  getDatesRange,
} from '@/service/ConvertDateTime';
import { getLocalStorage } from '@/service/Storage';
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface FormData {
  name: string;
  type: { name: string; icon: string };
  dose: string;
  when: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  reminder: Date | string | undefined;
}

const AddMedicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: { name: '', icon: '' },
    dose: '',
    when: '',
    startDate: undefined,
    endDate: undefined,
    reminder: undefined,
  });
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimerPicker, setShowTimerPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveMedication = async () => {
    const docId = Date.now().toString();
    const user = await getLocalStorage('userDetail');

    if (
      !formData.name ||
      !formData.type ||
      !formData.dose ||
      !formData.endDate ||
      !formData.startDate
    ) {
      Platform.OS === 'ios' || Platform.OS === 'android'
        ? Alert.alert('Enter all fields..')
        : alert('Enter all fields..');
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, 'medication', docId), {
        ...formData,
        userEmail: user.email,
        docId,
        dates: getDatesRange(formData.startDate, formData.endDate),
      });
      Platform.OS === 'ios' || Platform.OS === 'android'
        ? Alert.alert('Great!', 'New medication added successfully!', [
            {
              text: 'Okay',
              onPress: () => router.push('/'),
            },
          ])
        : alert('New medication added successfully!');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 25 }}>
      <Text style={styles.header}>Add New Medication</Text>

      <View style={styles.inputGroup}>
        <AntDesign
          style={styles.icon}
          name="medicinebox"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Medicine Name"
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>

      <FlatList
        data={typeList}
        style={{ marginTop: 5 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.inputGroup,
                { marginRight: 10 },
                {
                  backgroundColor:
                    item.name === formData.type.name ? colors.PRIMARY : 'white',
                },
              ]}
              onPress={() => handleInputChange('type', item)}
            >
              <Text
                style={[
                  styles.typeText,
                  {
                    color: item.name === formData.type.name ? 'white' : 'black',
                  },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.inputGroup}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="eyedropper"
          size={24}
          color="black"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dose Ex. 2, 5ml"
          onChangeText={(value) => handleInputChange('dose', value)}
        />
      </View>

      <View style={styles.inputGroup}>
        <MaterialIcons
          name="access-time"
          size={24}
          color="black"
          style={styles.icon}
        />
        <Picker
          selectedValue={formData.when}
          onValueChange={(itemValue, i) => {
            handleInputChange('when', itemValue);
          }}
          style={{
            width: '90%',
            height: Platform.OS === 'ios' ? 50 : 40, // Increase the height for better interaction
            alignSelf: 'center',
            borderWidth: 0,
            paddingHorizontal: 5,
          }}
        >
          {whenToTake.map((item, i) => (
            <Picker.Item
              key={i}
              label={item}
              value={item}
              style={styles.textInput}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <AntDesign
            style={styles.icon}
            name="calendar"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData.startDate
              ? formatDateForText(formData.startDate)
              : 'Start Date'}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(e) => {
              handleInputChange(
                'startDate',
                ConvertDateTime(e.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={formData.startDate ?? new Date()}
          />
        )}

        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <AntDesign
            style={styles.icon}
            name="calendar"
            size={24}
            color="black"
          />
          <Text style={styles.text}>
            {formData.endDate
              ? formatDateForText(formData.endDate)
              : 'End Date'}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(e) => {
              handleInputChange(
                'endDate',
                ConvertDateTime(e.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={formData.endDate ?? new Date()}
          />
        )}
      </View>

      <View style={styles.dateInputGroup}>
        <TouchableOpacity
          style={[styles.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimerPicker(true)}
        >
          <MaterialIcons
            name="timer"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text style={styles.text}>
            {formData.reminder
              ? `${formData.reminder}`
              : 'Select Reminder Time'}
          </Text>
        </TouchableOpacity>
        {showTimerPicker && (
          <RNDateTimePicker
            mode="time"
            onChange={(e) => {
              handleInputChange(
                'reminder',
                formatTime(e.nativeEvent.timestamp)
              );
              setShowTimerPicker(false);
            }}
            value={formData.reminder ? new Date(formData.reminder) : new Date()}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => saveMedication()}>
        {loading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={styles.buttonText}>Add New Medication</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.LIGHT_GRAY_BORDER,
    marginTop: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderColor: colors.LIGHT_GRAY_BORDER,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    color: colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 12,
    borderColor: colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    padding: 5,
  },
  dateInputGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 15,
    width: '100%',
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
});

export default AddMedicationForm;
