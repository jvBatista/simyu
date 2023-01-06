import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { RegularText } from '../../atoms/RegularText';
import {
  Container,
} from './styles';

interface TabBarProps {
  prop1: boolean,
  prop2: string;
}


export const TabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {
        state.routes.map((route: { key: string | number; name: any; }, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Container isFocused={isFocused} key={route.key}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
              >
                <RegularText
                  weight={isFocused ? 'medium' : 'regular'}
                  variant={isFocused ? 'orange' : 'white'}
                  size='smaller'
                  spaced
                >
                  {label}
                </RegularText>
              </TouchableOpacity>
            </Container>
          );
        })
      }
    </View>
  );
}