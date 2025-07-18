import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import Screen from "./lib/Screen";

export default function Home() {
  return (
    <Screen>

      <View className="flex-1 pt-12 px-2">
        <Text>Hello, World!</Text>
      </View>

    </Screen>
  )
}

