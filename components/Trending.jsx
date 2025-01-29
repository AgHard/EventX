import { FlatList, TouchableOpacity, ImageBackground, Text, View} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { format } from "date-fns";
import { useRouter } from "expo-router";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};
const TrendingItem = ({id, activeItem, item}) =>{
  
  const router = useRouter();
  const handlePress = () => {
    router.push(`/EventDetails/${id}`);
  };
  
  return (
    <Animatable.View
    className = "mr-5"
    // animation="fadeInRight"
    animation={activeItem === item.$id ? zoomIn : zoomOut}
    duration={500}
    iterationCount={1}>
        <TouchableOpacity
          className="relative flex items-center justify-center"
          activeOpacity={0.7}
          onPress={handlePress}
        >
          <ImageBackground
            source={{
              uri: item.image,
            }}
            className="w-52 h-72 rounded-[20px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          >
            <View className="absolute bottom-0 w-full p-2 bg-black bg-opacity-50">
              <Text className="text-xl font-bold text-white">{item.title}</Text>
              <Text className="mt-1 text-sm text-gray-300">{format(new Date(item.date), "MMM d, yyyy")}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
    </Animatable.View>
  )
}
const Trending = ({events}) => {

  const [activeItem, setActiveItem] = useState(events[0]);

  const viewableItemsChanged = ({viewableItems}) =>{
    if (viewableItems.length > 0){
      setActiveItem(viewableItems[0].key);
    }
  }
  return (
    <FlatList
    data={events}
    key={(item) => item.id}
    keyExtractor={(item) => item.id}
    renderItem={({item}) =>(
      <TrendingItem id = {item.id} activeItem = {activeItem} item = {item}/>
    )}
    // onViewableItemsChanged={viewableItemsChanged}
    viewabilityConfig={{
      itemVisiblePercentThreshold : 70
    }}
    contentOffset={{x : 170}}
    horizontal
    />
  )
}
export default Trending