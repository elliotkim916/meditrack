import colors from '@/Constant/colors';
import { typeList } from '@/Constant/options';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
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
}

const AddMedicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    type: { name: '', icon: '' },
    dose: '',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
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
});

export default AddMedicationForm;
