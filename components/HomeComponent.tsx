import { StatusBar } from "expo-status-bar";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import Screen from "./lib/Screen";

import { CalendarDaysIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { useState } from "react";

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState<number[]>([]);

  const handleLocation = (location: number) => {
    alert("location: " + location);
  }

  return (
    <Screen>

      <View className="flex flex-1 pt-12 px-2 mb-6">

        {/* Search Section */}
        <View className="relative mx-4 z-50 rounded-md overflow-hidden" >
          <View style={{ backgroundColor: showSearch ? 'rgba(255, 255, 255, .2)' : 'transparent' }} className="flex-row justify-end items-center p-1">
            {
              showSearch ? (
                <TextInput className="flex-1 h-full color-gray-300" placeholder="Search City" placeholderTextColor="lightgray" />
              ) : null
            }

            <TouchableOpacity onPress={() => setShowSearch(prev => !prev)} style={{ backgroundColor: 'rgba(255, 255, 255, .3)' }} className="px-5 py-3 rounded-md">
              <Text>
                <MagnifyingGlassIcon size={18} color="lightgray" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Locations Section */}
        {
          locations.length > 0 && showSearch ? (
            <View className="absolute z-50 w-full bg-gray-100 gap-1 top-28 left-2 rounded-md overflow-hidden">
              {
                locations.map(location => (
                  <TouchableOpacity onPress={() => handleLocation(location)} key={location} className="flex-row items-center py-3 px-3 bg-gray-300">
                    <MapPinIcon size={20} color="gray" />
                    <Text className="color-gray-400 ml-3">Casablanca, Morocco</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          ) : null
        }

        {/* Forecast Section */}
        <View className="flex flex-1 top-4 justify-around mb-8">
          {/* Location */}
          <Text className="text-white text-center text-bold text-5xl">Casablanca, <Text className="text-gray-400 text-2xl font-semibold">Morocco</Text></Text>

          {/* Weather Image */}
          <View className="flex-row justify-center">
            <Image source={require("../assets/images/sun.png")} className="w-72 h-72" />
          </View>

          {/* Temperature */}
          <View className="space-y-2">
            <Text className="text-white text-center text-9xl font-bold">30°</Text>
            <Text className="text-gray-300 text-center text-3xl tracking-widest">Sunny</Text>
          </View>

          {/* Other Details */}
          <View className="flex-row justify-between mx-4">
            <View className="flex-row items-center">
              <Image source={require("../assets/icons/wind.png")} className="w-8 h-8" />
              <Text className="text-white text-lg font-semibold ml-2">10km</Text>
            </View>
            <View className="flex-row items-center">
              <Image source={require("../assets/icons/drop.png")} className="w-8 h-8" />
              <Text className="text-white text-lg font-semibold ml-2">10km</Text>
            </View>
            <View className="flex-row items-center">
              <Image source={require("../assets/icons/sun.png")} className="w-8 h-8" />
              <Text className="text-white text-lg font-semibold ml-2">10km</Text>
            </View>
          </View>
        </View>

        {/* Forecast For Next Days */}
        <View className="mb-2 space-y-3">
          <View className="flex-row items-center mx-5 mb-4 space-x-2">
            <CalendarDaysIcon size={24} color="white" />
            <Text className="text-white text-base ml-2">Daily Forecast</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Monday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Tuesday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Wednesday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Thursday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Friday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Saturday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }} className="flex justify-center items-center w-24 rounded-md overflow-hidden py-3 mr-4">
              <Image source={require("../assets/images/heavyrain.png")} className="h-11 w-11 mb-4" />
              <Text className="text-white mb-2">Sunday</Text>
              <Text className="text-white text-xl font-semibold">30°</Text>
            </View>
          </ScrollView>
        </View>

      </View>

    </Screen>
  )
}

