import { View, Text, FlatList, ActivityIndicator  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { searchEvents } from '../../lib/api';
import useApi from '../../lib/useApi';
import ImageCard from '../../components/ImageCard';
import { useLocalSearchParams } from 'expo-router';
const Search = () => {

  const {query} = useLocalSearchParams();
  const [error, setError] = useState(null);
  const { data: events, isLoading, refetch } = useApi(() => searchEvents(query), {
    onError: (err) => {
      setError(err.message || 'Failed to fetch search results');
    },
  });
  
  
  useEffect(() => {
    if (query) {
      setError(null); 
      refetch();
    }
  }, [query]);
  
  return (
    <SafeAreaView className = "h-full bg-primary">
      {isLoading ? (
        <View className="flex items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : error ? (
        <View className="flex items-center justify-center flex-1">
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
        keyExtractor={(item) => item.id}
        key={(item) => item.id}
        renderItem={({item})=>(
          <ImageCard
            title={item.title}
            id = {item.id}
            date={item.date}
            price={item.price}
            image={item.image}
            location={item.location}
          />
        )}
        ListHeaderComponent={()=> (
          <View className="flex px-4 my-6">
                <Text className="text-sm font-bold text-gray-100">
                  Search Results
                </Text>
                <Text className="text-2xl font-bold text-white">
                  {query}
                </Text>
                <View className = "mt-6 mb-8">
                  <SearchInput initialQuery = {query}/>
                </View>
          </View>
        )}
        ListEmptyComponent={()=> (
          <EmptyState title = "No Results Found" subtitle="No Events Exist by this name"/>
        )}
      />
      )}
    </SafeAreaView>
  )
}
export default Search