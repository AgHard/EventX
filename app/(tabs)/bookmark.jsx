import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { getEventsByUserId } from '../../lib/api';
import useApi from '../../lib/useApi';
import ImageCard from '../../components/ImageCard';
import { useSelector } from 'react-redux';
import InfoBox from '../../components/InfoBox';
import EmptyState from '../../components/EmptyState';
import { useIsFocused } from '@react-navigation/native';

const Bookmark = () => {
  const {user} = useSelector((state) => state.user);

  const { data: events, isLoading, refetch } = useApi(() => getEventsByUserId(user.id));
  const isFocused = useIsFocused();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (isFocused) {
      refetchWithErrorHandling();
    }
  }, [isFocused]);
  
  const refetchWithErrorHandling = async () => {
    try {
      setError(null);
      await refetch();
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  const dismissError = () => setError(null);

  return (
    <SafeAreaView className="h-full bg-primary">
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
        keyExtractor={(item) => item.id.toString()}
        key={(item) => item.id}
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
            <View className="flex-row mt-5">
              <InfoBox
                title="Registered Events"
                containerStyles="ml-0"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() =>
          !isLoading && !error ? (
            <EmptyState
              title="No Results Found"
              subtitle="No Events Registered by this user"
            />
          ) : null
        }
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
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
