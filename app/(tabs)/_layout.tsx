import { getLocalStorage } from '@/service/Storage';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useEffect } from 'react';

const TabLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const getUserDetail = async () => {
      const userInfo = await getLocalStorage('userDetail');

      if (!userInfo) {
        router.replace('/login');
      }
    };

    getUserDetail();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: 'Add New',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
