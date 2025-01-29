import { View, Text, FlatList, Image, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../../constants";
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { getAllEvents, getLatestEvents } from '../../lib/api';
import useApi from '../../lib/useApi';
import ImageCard from '../../components/ImageCard';
import { useSelector } from 'react-redux';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null); 
  const { data: events, refetch, isLoading } = useApi(getAllEvents);
  const { data: latestEvents, refetch: refetchLatest } = useApi(getLatestEvents);

  // Get the user from Redux store
  const user = useSelector((state) => state.user.user);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setError(null); 
      await Promise.all([refetch(), refetchLatest()]);
    } catch (err) {
      setError(err.message || 'Failed to refresh events.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const fetchEventsWithErrorHandling = async () => {
      try {
        setError(null); 
        await Promise.all([refetch(), refetchLatest()]);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching events.');
      }
    };

    fetchEventsWithErrorHandling();
  }, []);

  const dismissError = () => setError(null);

  return (
    <SafeAreaView className="h-full bg-primary" style={styles.container}>
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.dismissText} onPress={dismissError}>
            Dismiss
          </Text>
        </View>
      )}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        key={(item) => item.id}
        renderItem={({ item }) => (
          <ImageCard
            key={item.id}
            title={item.title}
            id={item.id}
            date={item.date}
            price={item.price}
            image={item.image}
            location={item.location}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex px-4 my-6 space-y-6">
            <View className="flex flex-row items-start justify-between mb-6">
              <View>
                <Text className="text-sm font-bold text-gray-100">Welcome,</Text>
                <Text className="text-2xl font-bold text-white">
                  {user?.username || 'Guest'}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logo}
                  className="h-9 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="flex-1 w-full pt-5 pb-8">
              <Text className="mb-3 text-2xl font-bold text-gray-100">Latest Events</Text>
              <Trending events={latestEvents ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          !isLoading && !error ? (
            <EmptyState title="No Events Found" subtitle="No events exist yet." />
          ) : null
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  errorBanner: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  dismissText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
});
