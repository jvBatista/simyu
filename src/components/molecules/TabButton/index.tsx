import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import theme from '../../../theme';
import {
  Container,
} from './styles';


export const TabButton = (props: BottomTabBarButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={
        [props.style, {
          borderTopColor: `${props.accessibilityState?.selected ? theme.colors.orange : theme.colors.ayu_900}`,
          borderTopWidth: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }]
      }
    />
  );
};