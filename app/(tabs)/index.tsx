import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { auth } from '@/config/FirebaseConfig';
import colors from '@/Constant/colors';
import { removeLocalStorage } from '@/service/Storage';
import { signOut } from 'firebase/auth';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = () => {
  const handleSignOut = () => {
    signOut(auth);
    removeLocalStorage('userDetail');
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
      }}
    >
      <Header />
      <EmptyState />
      <TouchableOpacity onPress={() => handleSignOut()} style={styles.button}>
        <Text style={{ fontSize: 17, color: 'white', textAlign: 'center' }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    backgroundColor: colors.PRIMARY,
    borderRadius: 10,
    marginTop: 35,
  },
});

export default HomeScreen;
