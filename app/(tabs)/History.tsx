import { MedListItem } from '@/components/MedicationList';
import { db } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { getPrevDateRangeToDisplay } from '@/service/ConvertDateTime';
import { getLocalStorage } from '@/service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const History = () => {
  const [loading, setLoading] = useState(false);
  const [medList, setMedList] = useState<MedListItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  );
  const [dateRange, setDateRange] =
    useState<{ date: string; day: string; formatted: string }[]>();

  const getDateList = () => {
    const dates = getPrevDateRangeToDisplay();
    setDateRange(dates);
  };

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
    getDateList();
    getMedicationList(selectedDate);
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.imageBase}
        source={require('./../../assets/images/med-history.png')}
      />
      <Text style={styles.header}>Medication History</Text>

      <FlatList
        style={{ marginTop: 15 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={dateRange}
        keyExtractor={(item, i) => `${item.formatted}-${i}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedDate(item.formatted);
                // getMedicationList(item.formattedDate);
              }}
              style={[
                styles.dateGroup,
                {
                  backgroundColor:
                    item.formatted === selectedDate
                      ? colors.PRIMARY
                      : colors.LIGHT_GRAY_BORDER,
                },
              ]}
            >
              <Text
                style={[
                  styles.day,
                  {
                    color: item.formatted === selectedDate ? 'white' : 'black',
                  },
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.date,
                  {
                    color: item.formatted === selectedDate ? 'white' : 'black',
                  },
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: 'white',
  },
  imageBase: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
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
export default History;
