import colors from '@/Constant/colors';
import { getLocalStorage } from '@/service/Storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const getUserDetail = async () => {
      const userInfo = await getLocalStorage('userDetail');
      setUser(userInfo);
    };

    getUserDetail();
  }, []);

  return (
    <View style={{ marginTop: 20, width: '100%' }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={require('./../assets/images/smiley.png')}
            style={{ width: 45, height: 45 }}
          />
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Hello {user?.displayName ?? ''} 👋
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/add-new-medication')}>
          <Ionicons name="medkit" size={34} color={colors.PRIMARY} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
