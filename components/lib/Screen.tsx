import { StatusBar } from "expo-status-bar";
import { Image, View } from "react-native";

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-1 relative">
      <Image source={require("../../assets/images/bg.png")} className="absolute w-full h-full" blurRadius={75} />

      {children}

      <StatusBar style="light" />
    </View>
  )
}
