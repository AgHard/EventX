import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getEventsByUserId, signOut } from '../../lib/api';
import useApi from '../../lib/useApi';
import ImageCard from '../../components/ImageCard';
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction, fetchCurrentUser } from '../../redux/slices/userSlice';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
import EmptyState from '../../components/EmptyState';
import { useIsFocused } from '@react-navigation/native';

const Profile = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { user, isLogged } = useSelector((state) => state.user);
  const { data: events, isLoading, error, refetch } = useApi(() => getEventsByUserId(user?.id));

  const [logoutError, setLogoutError] = useState(null);

  const logout = async () => {
    try {
      setLogoutError(null); 
      await signOut();
      dispatch(logoutAction());
      router.replace('/sign-in');
    } catch (error) {
      setLogoutError('Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }

    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <SafeAreaView className="h-full bg-primary">
      {logoutError && (
        <View className="p-4 bg-red-500">
          <Text className="text-center text-white">{logoutError}</Text>
        </View>
      )}
      {isLoading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="mt-2 text-gray-300">Loading...</Text>
        </View>
      ) : error ? (
        <View className="items-center justify-center flex-1">
          <Text className="text-red-500">{error}</Text>
          <TouchableOpacity
            onPress={refetch}
            className="px-4 py-2 mt-4 bg-blue-500 rounded"
          >
            <Text className="text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          key={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ImageCard
              title={item.title}
              id={item.id}
              date={item.date}
              price={item.price}
              image={item.image}
              location={item.location}
            />
          )}
          ListHeaderComponent={() => (
            <View className="items-center justify-center w-full px-4 mt-6 mb-12">
              <TouchableOpacity className="items-end w-full mb-10" onPress={logout}>
                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
              </TouchableOpacity>
              <View className="items-center justify-center w-16 h-16 border rounded-lg border-secondary">
                <Image
                  source={icons.profile}
                  className="w-[90%] h-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <InfoBox title={user?.username || 'Guest'} containerStyles="mt-5" titleStyles="text-lg" />
              <View className="flex-row mt-5">
                <InfoBox
                  title={events?.length || 0}
                  subtitle="Registered Events"
                  containerStyles="mr-5"
                  titleStyles="text-xl"
                />
                <InfoBox title="0" subtitle="Created Events" titleStyles="text-xl" />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Results Found"
              subtitle="No Events Registered by this user"
            />
          )}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
