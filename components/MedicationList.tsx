import { db } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { getDateRangeToDisplay } from '@/service/ConvertDateTime';
import { getLocalStorage } from '@/service/Storage';
import { useRouter } from 'expo-router';
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
import EmptyState from './EmptyState';
import MedicationCardItem from './MedicationCardItem';

export type MedListItem = {
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

const MedicationList = () => {
  const getDateRangeList = () => {
    return getDateRangeToDisplay();
  };

  const [medList, setMedList] = useState<MedListItem[]>([]);
  const [dateRange, setDateRange] =
    useState<{ date: string; day: string; formattedDate: string }[]>();

  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getMedicationList = async (selectedDate: string) => {
    setLoading(true);
    setMedList([]);
    const user = await getLocalStorage('userDetail');

    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user.email)
        // where('dates', 'array-contains', selectedDate)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log('docId: ' + doc.id + '==>', doc.data());
        setMedList((prev) => [...prev, doc.data()] as MedListItem[]);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
              onPress={() => {
                setSelectedDate(item.formattedDate);
                getMedicationList(item.formattedDate);
              }}
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

      {medList.length > 0 ? (
        <FlatList
          data={medList}
          onRefresh={() => getMedicationList(selectedDate)}
          refreshing={loading}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: '/action-modal',
                    params: {
                      ...item,
                      selectedDate,
                    },
                  })
                }
              >
                <MedicationCardItem
                  medicine={item}
                  selectedDate={selectedDate}
                  iconUri={item.type.icon}
                />
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <EmptyState />
      )}
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
