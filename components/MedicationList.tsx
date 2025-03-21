import colors from '@/Constant/colors';
import { getDateRangeToDisplay } from '@/service/ConvertDateTime';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

const MedicationList = () => {
  const getDateRangeList = () => {
    return getDateRangeToDisplay();
  };

  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] =
    useState<{ date: string; day: string; formattedDate: string }[]>();

  useEffect(() => {
    setDateRange(getDateRangeList());
  }, []);

  return (
    <View style={{ marginTop: 25 }}>
      <Image
        source={require('./../assets/images/medication.jpeg')}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15,
        }}
      />
      <FlatList
        style={{ marginTop: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dateRange}
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={styles.dateGroup}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateGroup: {
    padding: 15,
    backgroundColor: colors.LIGHT_GRAY_BORDER,
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default MedicationList;
