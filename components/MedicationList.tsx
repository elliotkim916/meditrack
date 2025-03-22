import { db } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { getDateRangeToDisplay } from '@/service/ConvertDateTime';
import { getLocalStorage } from '@/service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MedicationCardItem from './MedicationCardItem';

const MedicationList = () => {
  const getDateRangeList = () => {
    return getDateRangeToDisplay();
  };

  const [medList, setMedList] = useState<any[]>([]);
  const [dateRange, setDateRange] =
    useState<{ date: string; day: string; formattedDate: string }[]>();

  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  );

  const getMedicationList = async (selectedDate: string) => {
    const user = await getLocalStorage('userDetail');

    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user.email),
        where('dates', 'array-contains', selectedDate)
      );

      const querySnapshot = await getDocs(q);

      setMedList([]);

      querySnapshot.forEach((doc) => {
        console.log('docId: ' + doc.id + '==>', doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setDateRange(getDateRangeList());
  }, []);

  useEffect(() => {
    getDateRangeList();
    getMedicationList(selectedDate);
  }, [selectedDate]);

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
        keyExtractor={(item, i) => `${item.formattedDate}-${i}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelectedDate(item.formattedDate)}
              style={[
                styles.dateGroup,
                {
                  backgroundColor:
                    item.formattedDate === selectedDate
                      ? colors.PRIMARY
                      : colors.LIGHT_GRAY_BORDER,
                },
              ]}
            >
              <Text
                style={[
                  styles.day,
                  {
                    color:
                      item.formattedDate === selectedDate ? 'white' : 'black',
                  },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    color:
                      item.formattedDate === selectedDate ? 'white' : 'black',
                  },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        data={medList}
        renderItem={({ item }) => {
          return <MedicationCardItem medicine={item} />;
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
