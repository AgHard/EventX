import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

const ImageCard = ({id, title, date, price, image, location }) => {
  
  const formattedDate = format(new Date(date), "MMM d, yyyy")
  const router = useRouter();
  const handlePress = () => {
    router.push(`/EventDetails/${id}`);
  };
  return (
    <View className="flex flex-col px-4 rounded-lg shadow-md bg-primary mb-14">
      <View className="flex flex-row items-start gap-3">
        <View className="flex flex-row items-center justify-center flex-1 w-full">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: image }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-2 gap-y-1">
            <Text
              className="text-lg font-bold text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            
            <Text
              className="text-sm font-bold text-gray-100"
              numberOfLines={1}
              // adjustsFontSizeToFit
            >
              <Icon name="location-on" size={13} color="#FFA500"/>
              {location}
            </Text>
          </View>
        </View>

        <View className="flex justify-center">
          <Text
            className="text-lg font-bold text-gray-100"
            numberOfLines={1}
            >
            {formattedDate}
            </Text>
          <Text
            className="m-1 text-sm font-bold text-gray-100"
            numberOfLines={1}
            >
            ${price}
            </Text>
        </View>
      </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="relative flex items-center justify-center w-full mt-3 h-60 rounded-xl"
          onPress={handlePress}
        >
          <Image
            source={{ uri: image }}
            className="w-full h-full mb-3 rounded-xl"
            resizeMode="cover"
          />
        </TouchableOpacity>
    </View>
  );
};

export default ImageCard;
