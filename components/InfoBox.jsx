import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-bold ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm font-bold text-center text-gray-100">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
