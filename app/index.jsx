import { ScrollView, Text, View, Image, ActivityIndicator, Alert } from "react-native";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useSelector } from "react-redux";
import { TailwindProvider } from 'tailwindcss-react-native';
import { NativeWindStyleSheet } from "nativewind";
export default function App() {
  const { loading, isLogged, error } = useSelector((state) => state.auth);

  if (error) {
    Alert.alert("Error", "Something went wrong while loading the app. Please try again later.");
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-gray-500">
        <Text className="text-center text-white">
          Failed to load application data. Please restart the app.
        </Text>
      </SafeAreaView>
    );
  }

  if (!loading && isLogged) return <Redirect href="/home" />;
  
  return (
    <TailwindProvider>
      
    <SafeAreaView className="h-full bg-gray-500">
      {loading ? (
        <View className="items-center justify-center flex-1">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="items-center justify-center w-full min-h-[85vh] px-4">
            <Image
              source={images.logo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
              onError={() => Alert.alert("Error", "Failed to load the logo.")}
              />
            <Image
              source={images.cards}
              className="max-w-[380px] w-[298px] h-[298px]"
              resizeMode="contain"
              onError={() => Alert.alert("Error", "Failed to load the cards image.")}
              />
            <View className="relative mt-5">
              <Text className="text-3xl font-bold text-center text-white">
                Discover All{"\n"}Events with{" "}
                <Text className="text-stone-950">EventX</Text>
              </Text>
              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                resizeMode="contain"
                onError={() => Alert.alert("Error", "Failed to load the decorative path.")}
              />
            </View>
            <Text className="text-sm text-center text-gray-50 font-pregular mt-7">
              EventsX lets you take care of every aspect of events happening around you.
            </Text>
            <CustomButton
              title="Continue with App"
              handlePress={() => {
                try {
                  router.push("/sign-in");
                } catch {
                  Alert.alert("Error", "Failed to navigate to sign-in page.");
                }
              }}
              containerStyles="w-full mt-7"
              />
          </View>
        </ScrollView>
      )}
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
    </TailwindProvider>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});