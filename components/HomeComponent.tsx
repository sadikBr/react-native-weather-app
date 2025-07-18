import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import Screen from './lib/Screen';

import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { useCallback, useEffect, useState } from 'react';
import { getForecastData, getLocationData } from 'api/weather';

function getDay(date: string) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = new Date(date).getDay();
  return days[day];
}

const weatherImages = new Map<string, ImageSourcePropType>([
  ['partly cloudy', require('../assets/images/partlycloudy.png')],
  ['moderate rain', require('../assets/images/moderaterain.png')],
  ['patchy rain possible', require('../assets/images/moderaterain.png')],
  ['patchy rain nearby', require('../assets/images/moderaterain.png')],
  ['sunny', require('../assets/images/sun.png')],
  ['clear', require('../assets/images/sun.png')],
  ['overcast', require('../assets/images/cloud.png')],
  ['cloudy', require('../assets/images/cloud.png')],
  ['light rain', require('../assets/images/moderaterain.png')],
  ['moderate rain at times', require('../assets/images/moderaterain.png')],
  ['heavy rain', require('../assets/images/heavyrain.png')],
  ['heavy rain at times', require('../assets/images/heavyrain.png')],
  ['moderate or heavy freezing rain', require('../assets/images/heavyrain.png')],
  ['moderate or heavy rain shower', require('../assets/images/heavyrain.png')],
  ['moderate or heavy rain with thunder', require('../assets/images/heavyrain.png')],
  ['other', require('../assets/images/moderaterain.png')],
]);

export type LocationForecast = {
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      astro: {
        sunrise: string;
      };
      day: {
        avgtemp_c: number;
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
  location: Location;
};
type Location = {
  name: string;
  country: string;
  region: string;
  lat: number;
  lon: number;
  url: string;
  id: string;
};

function LoadingView() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Loading...</Text>
    </View>
  );
}

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);

  const [query, setQuery] = useState('');
  const [currentLocationForecast, setCurrentLocationForecast] = useState<LocationForecast | null>(
    null
  );

  const handleLocationClick = async (location: Location) => {
    const forecast = await getForecastData(`${location.name}, ${location.country}`);
    setCurrentLocationForecast(forecast);
    setShowSearch(false);
    setQuery('');
    setLocations([]);
  };

  const handleInputSubmit = async () => {
    const locations = await getLocationData(query);
    setLocations(locations);
  };

  const getLocationsData = useCallback(async (query: string) => {
    const locations = await getLocationData(query);
    return locations;
  }, []);

  useEffect(() => {
    getLocationsData('Demnate').then(async (data) => {
      const forecast = await getForecastData(`${data[0].name}, ${data[0].country}`);
      setCurrentLocationForecast(forecast);
    });
  }, [getLocationsData]);

  return (
    <Screen>
      <View className="mb-6 flex flex-1 px-2 pt-12">
        {/* Search Section */}
        <View className="relative z-50 mx-4 overflow-hidden rounded-md">
          <View
            style={{ backgroundColor: showSearch ? 'rgba(255, 255, 255, .2)' : 'transparent' }}
            className="flex-row items-center justify-end p-1">
            {showSearch ? (
              <TextInput
                className="h-full flex-1 color-gray-300"
                placeholder="Search City"
                placeholderTextColor="lightgray"
                value={query}
                onChangeText={(text) => setQuery(text)}
                onSubmitEditing={handleInputSubmit}
              />
            ) : null}

            <TouchableOpacity
              onPress={() => setShowSearch((prev) => !prev)}
              style={{ backgroundColor: 'rgba(255, 255, 255, .3)' }}
              className="rounded-md px-5 py-3">
              <Text>
                <MagnifyingGlassIcon size={18} color="lightgray" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Locations Section */}
        {locations.length > 0 && showSearch ? (
          <View className="absolute left-2 top-28 z-50 w-full gap-1 overflow-hidden rounded-md bg-gray-100">
            {locations.map((location) => (
              <TouchableOpacity
                onPress={() => handleLocationClick(location)}
                key={location.id}
                className="flex-row items-center bg-gray-300 px-3 py-3">
                <MapPinIcon size={20} color="gray" />
                <Text className="ml-3 color-gray-400">
                  {location.name}, {location.country}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        {/* Forecast Section */}
        {currentLocationForecast !== null ? (
          <View className="top-4 mb-8 flex flex-1 justify-around">
            {/* Location */}
            <Text className="text-bold text-center text-5xl text-white">
              {currentLocationForecast.location.name},{' '}
              <Text className="text-2xl font-semibold text-gray-400">
                {currentLocationForecast.location.country}
              </Text>
            </Text>

            {/* Weather Image */}
            <View className="flex-row justify-center">
              <Image
                source={weatherImages.get(
                  currentLocationForecast.current.condition.text.toLowerCase()
                )}
                className="h-72 w-72"
              />
            </View>

            {/* Temperature */}
            <View className="space-y-2">
              <Text className="text-center text-9xl font-bold text-white">
                {currentLocationForecast.current.temp_c}°{' '}
                <Text className="text-2xl font-semibold color-orange-200">
                  Feels like {currentLocationForecast.current.feelslike_c}°
                </Text>
              </Text>
              <Text className="text-center text-3xl tracking-widest text-gray-300">
                {currentLocationForecast.current.condition.text}
              </Text>
            </View>

            {/* Other Details */}
            <View className="mx-4 flex-row justify-between">
              <View className="flex-row items-center">
                <Image source={require('../assets/icons/wind.png')} className="h-8 w-8" />
                <Text className="ml-2 text-lg font-semibold text-white">
                  {currentLocationForecast.current.wind_kph}km
                </Text>
              </View>
              <View className="flex-row items-center">
                <Image source={require('../assets/icons/drop.png')} className="h-8 w-8" />
                <Text className="ml-2 text-lg font-semibold text-white">
                  {currentLocationForecast.current.humidity}%
                </Text>
              </View>
              <View className="flex-row items-center">
                <Image source={require('../assets/icons/sun.png')} className="h-8 w-8" />
                <Text className="ml-2 text-lg font-semibold text-white">
                  {currentLocationForecast.forecast.forecastday[0].astro.sunrise}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <LoadingView />
        )}

        {/* Forecast For Next Days */}
        <View className="mb-2 space-y-3">
          <View className="mx-5 mb-4 flex-row items-center space-x-2">
            <CalendarDaysIcon size={24} color="white" />
            <Text className="ml-2 text-base text-white">Daily Forecast</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}>
            {currentLocationForecast?.forecast.forecastday.map((day) => (
              <View
                key={day.date}
                style={{ backgroundColor: 'rgba(255, 255, 255, .15)' }}
                className="mr-4 flex w-32 items-center justify-center overflow-hidden rounded-md py-3">
                <Image
                  source={weatherImages.get(day.day.condition.text.toLowerCase())}
                  className="mb-4 h-11 w-11"
                />
                <Text className="mb-2 text-white">{getDay(day.date)}</Text>
                <View className="flex-row items-center gap-3">
                  <Text className="text-xl font-semibold text-white">{day.day.avgtemp_c}°C</Text>
                  <View>
                    <Text className="color-red-500">{day.day.maxtemp_c}°C</Text>
                    <Text className="color-green-500">{day.day.mintemp_c}°C</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Screen>
  );
}
