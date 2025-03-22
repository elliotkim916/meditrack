import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  medicine: any;
}

const MedicationCardItem = ({ medicine }: Props) => {
  return (
    <View>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: medicine.type.icon }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View>
          <Text>{medicine.name}</Text>
          <Text>{medicine.when}</Text>
          <Text>
            {medicine.dose} {medicine.type.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});

export default MedicationCardItem;
