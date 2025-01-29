import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import { icons } from '../constants'
import { useState } from 'react'
import { router, usePathname } from 'expo-router'
const SearchInput = ({initialQuery}) => {

  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery ||'');
  const [error, setError] = useState(null);
  
  const handleSearch = () => {
    if (!query.trim()) {
      setError("Please input something to search for.");
      return;
    }

    try {
      setError(null);
      if (pathname.startsWith("/search")) {
        router.setParams({ query });
      } else {
        router.push(`/search/${query}`);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to perform search. Please try again.");
    }
  };
  
  return (
    <View>
      <View className="flex flex-row items-center w-full h-16 px-4 space-x-4 border-2 bg-black-100 rounded-2xl border-black-200 focus:border-secondary">
        <TextInput className="text-base mt-0.5 text-white flex-1 font-bold"
          placeholder="Search for event"
          value={query}
          onChangeText={(e) => setQuery(e)}
          placeholderTextColor="#CDCDE0"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image source={icons.search} className="w-6 h-6" resizeMode="center" />
        </TouchableOpacity>
      </View>
      {error && (
        <Text className="mt-2 text-lg text-red-500 font-pregular">
          {error}
        </Text>
      )}
    </View>
  )
}
export default SearchInput