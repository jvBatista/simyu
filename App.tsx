import React from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { ThemeProvider } from 'styled-components';
import { Home } from "./src/screens/Home";
import { Info } from "./src/screens/Info";

import theme from "./src/theme";
import { Loading } from "./src/screens/Loading";
import { Comparison } from "./src/screens/Comparison";
import { IncomeGraph } from "./src/components/molecules/IncomeGraph";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Urbanist_200ExtraLight': require('./src/assets/fonts/Urbanist/Urbanist-ExtraLight.ttf'),
    'Urbanist_400Regular': require('./src/assets/fonts/Urbanist/Urbanist-Regular.ttf'),
    'Urbanist_500Medium': require('./src/assets/fonts/Urbanist/Urbanist-Medium.ttf'),
    'Urbanist_600SemiBold': require('./src/assets/fonts/Urbanist/Urbanist-SemiBold.ttf')
  });

  if (!fontsLoaded) return <Loading />

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.ayu_900}
        barStyle={'light-content'}
      />
      <Comparison />
    </ThemeProvider>
  );
}
