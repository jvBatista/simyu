import React from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { ThemeProvider } from 'styled-components';
import { Loading } from "./src/screens/Loading";
import { Routes } from "./src/routes";

import theme from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    'Urbanist_200ExtraLight': require('./assets/fonts/Urbanist/Urbanist-ExtraLight.ttf'),
    'Urbanist_400Regular': require('./assets/fonts/Urbanist/Urbanist-Regular.ttf'),
    'Urbanist_500Medium': require('./assets/fonts/Urbanist/Urbanist-Medium.ttf'),
    'Urbanist_600SemiBold': require('./assets/fonts/Urbanist/Urbanist-SemiBold.ttf')
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        animated={true}
        backgroundColor={theme.colors.ayu_900}
        barStyle={'light-content'}
      />
      {
        !fontsLoaded ? <Loading /> : <Routes />
      }
    </ThemeProvider>
  );
}
