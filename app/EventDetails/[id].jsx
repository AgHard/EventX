import { useEffect, useState } from "react";
import { View, Text, ImageBackground, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { getEventDetails, getCurrentUser } from "../../lib/api";
import api from "../../lib/api";
import { CustomButton } from "../../components";
import Icon from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

const EventDetails = () => {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const eventData = await getEventDetails(id);
      setEvent(eventData);
    } catch (err) {
      setError(err.message || "Failed to load event details. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const submit = async () => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
  
      const user = await getCurrentUser();
  
      if (!user) {
        throw new Error("You must be logged in to register for an event.");
      }
  
      const response = await api.get(`/users/${user.id}`);
      const userData = response.data;
  
      if (userData.registeredEvents?.includes(event.id)) {
        setIsSubmitting(false);
        throw new Error("You have already registered for this event.");
      }
  
      const updatedUser = {
        ...userData,
        registeredEvents: [...(userData.registeredEvents || []), event.id],
      };
  
      await api.put(`/users/${user.id}`, updatedUser);
  
      Alert.alert("Event registered successfully!");
  
    } catch (err) {
      setSubmitError(err.message || "Failed to register for the event.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView className="flex items-center justify-center h-full bg-gray-900">
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="mt-2 text-white">Loading event details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex items-center justify-center h-full bg-gray-900">
        <Text className="px-4 text-center text-red-500">{error}</Text>
        <TouchableOpacity
          onPress={fetchEventDetails}
          className="px-6 py-3 mt-4 bg-orange-500 rounded-full"
        >
          <Text className="font-bold text-white">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const formattedDate = format(new Date(event.date), "MMMM d, yyyy, hh:mm a");

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="p-4">
        {/* Event Image with Title and Date */}
        <View className="relative mb-6 overflow-hidden bg-gray-800 rounded-lg shadow-lg">
          <ImageBackground
            source={{ uri: event.image }}
            className="w-full h-80"
            resizeMode="cover"
          >
            <View className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50">
              <Text className="text-xl font-bold text-white">{event.title}</Text>
              <Text className="mt-1 text-sm text-gray-300">{formattedDate}</Text>
            </View>
          </ImageBackground>
        </View>

        <View className="p-4 mb-6 bg-gray-800 rounded-lg shadow-md">
          <View className="flex flex-row items-center mb-2">
            <Icon name="location-on" size={20} color="#FFA500" />
            <Text className="text-lg font-bold text-white">Location</Text>
          </View>
          <Text className="font-semibold text-gray-300">{event.location}</Text>
        </View>

        <View className="p-4 mb-6 bg-gray-800 rounded-lg shadow-md">
          <View className="flex flex-row items-center mb-2">
            <Icon name="description" size={20} color="#FFA500" />
            <Text className="text-lg font-bold text-white ">Description</Text>
          </View>
          <Text className="font-semibold text-gray-300">{event.description}</Text>
        </View>

        <View className="p-4 mb-6 bg-gray-800 rounded-lg shadow-md">
          <View className="flex flex-row items-center mb-2">
            <Icon name="mic" size={20} color="#FFA500" />
            <Text className="text-lg font-semibold text-white ">Speakers</Text>
          </View>
          {event.speakers.map((speaker, index) => (
            <Text key={index} className="font-semibold text-gray-300">
              {speaker}
            </Text>
          ))}
        </View>

        <View className="flex flex-row items-center justify-between p-4 mb-6 bg-gray-800 rounded-lg shadow-md">
          <View className="flex flex-row items-center">
            <Icon name="attach-money" size={20} color="#FFA500" />
            <Text className="text-lg font-bold text-white">Price</Text>
          </View>
          <Text className="text-xl font-bold text-orange-500">${event.price}</Text>
        </View>

        <View className="p-4 mb-6 bg-gray-800 rounded-lg shadow-md">
          <View className="flex flex-row items-center mb-2">
            <Icon name="group" size={20} color="#FFA500" />
            <Text className="text-lg font-semibold text-white">Capacity</Text>
          </View>
          <Text className="font-semibold text-gray-300">Total Capacity: {event.capacity}</Text>
          <Text className="font-semibold text-gray-300">Available Spots: {event.availableSpots}</Text>
        </View>
        {submitError && (
          <Text className="mb-4 text-center text-red-500">{submitError}</Text>
        )}
        <View>
          <CustomButton
            handlePress={submit}
            title={isSubmitting ? "Registered" : "Register"}
            containerStyles="mb-10 bg-orange-500 rounded-full py-4"
            textStyles="text-white text-center font-bold"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetails;
